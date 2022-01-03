/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  Loader,
} from '@tessellation/core';
import * as express from 'express';
import { expressMiddleware as promExpressMiddleware } from 'prometheus-api-metrics';
import { Container } from 'typedi';

import { ExpressLoader } from '../express';
import { Logger } from '../logger';
import { PROMETHEUS_CONFIG_TOKEN } from './prometheus-config.token';

@Loader({
  deps: [ExpressLoader],
})
export class PrometheusLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (settings): void => {
      const expressApp = settings?.getValue<express.Application>('express_app');
      const log = new Logger(__filename, ['PROMETHEUS']);
      const config = Container.get(PROMETHEUS_CONFIG_TOKEN);

      if (expressApp) {
        log.info(`Registering Prometheus endpoint at '${config.route}'`);
        expressApp.use(promExpressMiddleware({ metricsPath: config.route }));
      }
    };
  }
}
