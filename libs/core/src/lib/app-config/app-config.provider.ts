/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkProvider } from '@tessellation/core';
import axios from 'axios';
import { Token } from 'typedi';

import { AppConfig, appConfigLoader, GenericAppConfig } from './config';
import { CONFIG_SERVICE_TOKEN } from './config-service.token';

const DEFAULT_BASE_INTERVAL = 1_000;

/**
 * @param resolve
 * @param reject
 * @param configServiceUrl
 * @param count
 * @param interval
 * @param maxRetry
 */
function exponentialBackoffGetConfig<T extends GenericAppConfig>(
  resolve: (config: AppConfig<T>) => void,
  reject: (reason: string) => void,
  configServiceUrl: string,
  count: number,
  interval: number,
  maxRetry: number,
): void {
  setTimeout(() => {
    axios
      .get(configServiceUrl)
      .then(({ data }) => resolve(appConfigLoader<T>(data.config as T)))
      .catch(error => {
        if (count >= maxRetry) {
          return reject(
            `connection failed ${maxRetry} times... config server appears to be down.`,
          );
        }
        count++;
        // eslint-disable-next-line no-console
        console.log(
          `cannot connect to config service because '${
            error.message as string
          }'. attempt ${count}/${maxRetry} in ${
            (interval * Math.pow(2, count)) / 1000
          } seconds...`,
        );
        exponentialBackoffGetConfig(
          resolve,
          reject,
          configServiceUrl,
          count,
          interval,
          maxRetry,
        );
      });
  }, interval * Math.pow(2, count));
}

/**
 * @param appConfigToken
 */
export function AppConfigProvider<T extends GenericAppConfig>(
  appConfigToken: Token<T>,
): FrameworkProvider<AppConfig<T>> {
  return {
    provide: appConfigToken,
    deps: [CONFIG_SERVICE_TOKEN],
    useValue: async (configServiceUrl: string): Promise<AppConfig<T>> =>
      await new Promise((resolve, reject) => {
        const maxRetry = 10;

        exponentialBackoffGetConfig(
          resolve,
          reject,
          configServiceUrl,
          0,
          DEFAULT_BASE_INTERVAL,
          maxRetry,
        );
      }),
  };
}
