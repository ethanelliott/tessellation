/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import * as express from 'express';
import { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger } from '../../logger';
import { InjectableMiddleware } from '../decorators';
import { EXPRESS_CONFIG_TOKEN } from '../express-config.token';

@InjectableMiddleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  private readonly _log = new Logger(__filename, ['EXPRESS', 'ERROR']);

  private readonly _config = Container.get(EXPRESS_CONFIG_TOKEN);

  error(
    error: Error,
    request: express.Request,
    response: express.Response,
  ): void {
    this._log.error(error);
    response.status(500);
    if (this._config.isProduction) {
      response.json({ error: { name: error.name, message: error.message } });
    } else {
      response.json({
        error: { name: error.name, message: error.message, stack: error.stack },
      });
    }
  }
}
