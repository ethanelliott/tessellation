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

import { DatabaseConfig } from './database-config';
import { DATABASE_CONFIG_TOKEN } from './database-config.token';

export const DatabaseProvider: FrameworkProvider<DatabaseConfig> = {
  provide: DATABASE_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(appConfig: AppConfig<T>) =>
    ({
      type: appConfig.get('database.type', true),
      host: appConfig.get('database.host', true),
      port: appConfig.get('database.port', true),
      database: appConfig.get('database.database', true),
      username: appConfig.get('database.username', true),
      password: appConfig.get('database.password', true),
    } as DatabaseConfig),
};
