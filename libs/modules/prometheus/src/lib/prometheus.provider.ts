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

import { PrometheusConfig } from './prometheus-config';
import { PROMETHEUS_CONFIG_TOKEN } from './prometheus-config.token';

const prefixSlash = (s: string): string => (s.startsWith('/') ? s : `/${s}`);

export const PrometheusProvider: FrameworkProvider<PrometheusConfig> = {
  provide: PROMETHEUS_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(appConfig: AppConfig<T>) => ({
    route: prefixSlash(appConfig.get('prometheus.route', false) ?? 'metrics'),
  }),
};
