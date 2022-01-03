/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  APP_CONFIG_TOKEN_SYMBOL,
  AppConfig,
  FrameworkProvider,
  GenericAppConfig,
} from '@tessellation/core';

import { LoggerConfig } from './logger-config';
import { LOGGER_CONFIG_TOKEN } from './logger-config.token';

export const LoggerProvider: FrameworkProvider<LoggerConfig> = {
  provide: LOGGER_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(appConfig: AppConfig<T>) => ({
    logLevel: appConfig.get('log.level') ?? 'debug',
    isProduction: appConfig.get('isProduction', true),
  }),
};
