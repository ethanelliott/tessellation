/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { addBannerEntry } from '@tessellation/banner';
import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  FrameworkUnloaderFunction,
  Loader,
} from '@tessellation/core';
import { Logger, LoggerLoader } from '@tessellation/logger';
import cors from 'cors';
import { Application, static as expressServeStatic } from 'express';
import { createServer, Server } from 'http';
import { join } from 'path';
import { createExpressServer, useContainer } from 'routing-controllers';

import { EXPRESS_CONFIG_TOKEN } from './express-config.token';
import { EXPRESS_CONTROLLER_TOKEN } from './express-controller.token';
import { TESSELLATION_ICON } from './icon';

@Loader({
  deps: [LoggerLoader],
})
export class ExpressLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    useContainer(Container);

    return (settings?: FrameworkSettings): void => {
      const log = new Logger(__filename, ['EXPRESS']);
      const config = Container.get(EXPRESS_CONFIG_TOKEN);

      const controllers = Container.get(EXPRESS_CONTROLLER_TOKEN);

      if (settings) {
        const expressApp: Application = createExpressServer({
          cors: true,
          classTransformer: true,
          validation: false,
          defaultErrorHandler: false,
          routePrefix: `/${config.routePrefix}`,
          controllers,
          middlewares: config.middlewares as Array<CallableFunction>,
        }) as Application;

        // needed to ensure that it adds cors to dependencies
        log.info('STARTING EXPRESS', JSON.stringify(cors));

        expressApp.use(
          '/assets',
          expressServeStatic(join(__dirname, 'assets'), {
            maxAge: 31557600000,
          }),
        );

        if (!config.isProduction) {
          expressApp.get('/', (request, response) =>
            response.json({
              environment: config.environment,
              name: config.name,
              version: config.version,
              description: config.description,
            }),
          );
        }

        expressApp.get('/favicon.ico', (request, response) => {
          response.statusCode = 200;
          response.setHeader('Content-Length', TESSELLATION_ICON.length);
          response.setHeader('Content-Type', 'image/x-icon');
          response.setHeader('Cache-Control', 'public, max-age=2592000');
          response.setHeader(
            'Expires',
            new Date(Date.now() + 2592000000).toUTCString(),
          );
          response.end(TESSELLATION_ICON);
        });

        if (config.actuator) {
          addBannerEntry('probe', '#{url}/probe');
          expressApp.get('/probe', (request, response) => {
            response.status(200).json({
              status: 'UP',
            });
          });
        }

        const server = createServer(expressApp);

        addBannerEntry('api', `#{url}${config.routePrefix}`);

        settings.setValue('server', server);
        settings.setValue('express_app', expressApp);
      }
    };
  }

  unloader(): FrameworkUnloaderFunction {
    return (settings?: FrameworkSettings): void => {
      if (settings) {
        const log = new Logger(__filename, ['EXPRESS']);

        log.info('starting graceful shutdown');
        if (settings.hasValue('server')) {
          const server = settings.getValue<Server>('server');

          server.close(() => {
            log.info('shutdown successfully');
          });
        }
      }
    };
  }
}
