/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  Loader,
} from '@tessellation/core';
import { Application } from 'express';
import { expressMiddleware as promExpressMiddleware } from 'prometheus-api-metrics';
import { Container } from 'typedi';

import { addBannerEntry } from '../banner';
import { ExpressLoader } from '../express';
import { PROMETHEUS_CONFIG_TOKEN } from './prometheus-config.token';

@Loader({
  deps: [ExpressLoader],
})
export class PrometheusLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (settings): void => {
      const expressApp = settings?.getValue<Application>('express_app');
      const config = Container.get(PROMETHEUS_CONFIG_TOKEN);

      if (expressApp) {
        expressApp.use(promExpressMiddleware({ metricsPath: config.route }));
        addBannerEntry('prometheus', `#{url}${config.route}`);
      }
    };
  }
}
