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

import { BannerConfig } from './banner-config';
import { BANNER_CONFIG_TOKEN } from './banner-config.token';

export const BannerProvider: FrameworkProvider<BannerConfig> = {
  provide: BANNER_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(appConfig: AppConfig<T>) => ({
    environment: appConfig.get('environment', true),
    name: appConfig.get('app.name', true),
    version: appConfig.get('app.version', true),
    url: appConfig.get('app.url', true),
  }),
};
