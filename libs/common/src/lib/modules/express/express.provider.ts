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

import { ExpressConfig } from './express-config';
import { EXPRESS_CONFIG_TOKEN } from './express-config.token';
import {
  ErrorMiddleware,
  LogMiddleware,
  SecurityMiddleware,
} from './middlewares';

export const ExpressProvider: FrameworkProvider<ExpressConfig> = {
  provide: EXPRESS_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(
    appConfig: AppConfig<T>,
  ): ExpressConfig =>
    <ExpressConfig>{
      isProduction: appConfig.get('isProduction', true),
      routePrefix: appConfig.get('app.address.routePrefix') ?? 'api',
      environment: appConfig.get('environment', true),
      name: appConfig.get('app.name', true),
      version: appConfig.get('app.version', true),
      description: appConfig.get('app.description', true),
      actuator: appConfig.get('actuator') ?? true,
      helmet: appConfig.get('helmet') ?? false,
      middlewares: [SecurityMiddleware, LogMiddleware, ErrorMiddleware],
    },
};
