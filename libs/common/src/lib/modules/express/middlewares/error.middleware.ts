/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Request, Response } from 'express';
import { ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Container } from 'typedi';

import { Logger } from '../../logger';
import { InjectableMiddleware } from '../decorators';
import { EXPRESS_CONFIG_TOKEN } from '../express-config.token';
import { HTTPResponseCodes } from '../http-response-codes.enum';

@InjectableMiddleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  private readonly _log = new Logger(__filename, ['EXPRESS', 'ERROR']);

  private readonly _config = Container.get(EXPRESS_CONFIG_TOKEN);

  error(error: Error, request: Request, response: Response): void {
    this._log.error(error);
    response.status(HTTPResponseCodes.INTERNAL_SERVER_ERROR);
    if (this._config.isProduction) {
      response.json({ error: { name: error.name, message: error.message } });
    } else {
      response.json({
        error: { name: error.name, message: error.message, stack: error.stack },
      });
    }
  }
}
