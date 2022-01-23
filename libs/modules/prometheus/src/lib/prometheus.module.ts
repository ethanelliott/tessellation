/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';

import { PrometheusLoader } from './prometheus.loader';
import { PrometheusProvider } from './prometheus.provider';

@Module({
  providers: [PrometheusProvider],
  loaders: [PrometheusLoader],
})
export class PrometheusModule {}
