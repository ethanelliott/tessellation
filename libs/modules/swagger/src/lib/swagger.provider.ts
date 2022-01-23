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

import { SwaggerConfig } from './swagger-config';
import { SWAGGER_CONFIG_TOKEN } from './swagger-config.token';

export const SwaggerProvider: FrameworkProvider<SwaggerConfig> = {
  provide: SWAGGER_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(
    appConfig: AppConfig<T>,
  ): SwaggerConfig =>
    <SwaggerConfig>{
      enabled: appConfig.get('swagger.enabled') ?? true,
      serverUrl: appConfig.get('app.url', true),
      title: appConfig.get('app.name', true),
      name: appConfig.get('app.name', true),
      version: appConfig.get('app.version', true),
      description: appConfig.get('app.description', true),
      routePrefix: appConfig.get('app.address.routePrefix') ?? 'api',
    },
};
