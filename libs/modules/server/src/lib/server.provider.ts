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

import { ServerConfig } from './server-config';
import { SERVER_CONFIG_TOKEN } from './server-config.token';

export const ServerProvider: FrameworkProvider<ServerConfig> = {
  provide: SERVER_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(
    appConfig: AppConfig<T>,
  ): ServerConfig =>
    <ServerConfig>{
      port: appConfig.get('app.address.port') ?? 8443,
    },
};
