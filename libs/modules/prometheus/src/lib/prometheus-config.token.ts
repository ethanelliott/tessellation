/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from '@tessellation/core';

import { PrometheusConfig } from './prometheus-config';

export const PROMETHEUS_CONFIG_TOKEN = new Token<PrometheusConfig>(
  'prometheus-config',
);
