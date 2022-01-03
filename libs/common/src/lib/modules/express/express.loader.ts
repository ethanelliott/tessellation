/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  FrameworkUnloaderFunction,
  Loader,
} from '@tessellation/core';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger, LoggerLoader } from '../logger';
import { EXPRESS_CONFIG_TOKEN } from './express-config.token';
import { EXPRESS_CONTROLLER_TOKEN } from './express-controller.token';
import { COMPETENCE_ONE_FAVICON } from './icon';

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
        const expressApp: express.Application = createExpressServer({
          cors: true,
          classTransformer: true,
          validation: false,
          defaultErrorHandler: false,
          routePrefix: `/${config.routePrefix}`,
          controllers,
          middlewares: config.middlewares as Array<CallableFunction>,
        }) as express.Application;

        // needed to ensure that it adds cors to dependencies
        log.info('STARTING EXPRESS', JSON.stringify(cors));

        if (config.helmet) {
          expressApp.use(helmet());
        }

        expressApp.use(
          '/assets',
          express.static(path.join(__dirname, 'assets'), {
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

        // TODO: need to make this generic
        expressApp.get('/favicon.ico', (request, response) => {
          response.statusCode = 200;
          response.setHeader('Content-Length', COMPETENCE_ONE_FAVICON.length);
          response.setHeader('Content-Type', 'image/x-icon');
          response.setHeader('Cache-Control', 'public, max-age=2592000');
          response.setHeader(
            'Expires',
            new Date(Date.now() + 2592000000).toUTCString(),
          );
          response.end(COMPETENCE_ONE_FAVICON);
        });

        if (config.actuator) {
          expressApp.get('/probe', (request, response) => {
            response.status(200).json({
              status: 'UP',
            });
          });
        }

        const server = http.createServer(expressApp);

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
          const server = settings.getValue<http.Server>('server');

          server.close(() => {
            log.info('shutdown successfully');
          });
        }
      }
    };
  }
}
