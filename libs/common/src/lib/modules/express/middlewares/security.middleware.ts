/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import * as express from 'express';
import * as helmet from 'helmet';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Container } from 'typedi';

import { InjectableMiddleware } from '../decorators';
import { EXPRESS_CONFIG_TOKEN } from '../express-config.token';

@InjectableMiddleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {
  private readonly _config = Container.get(EXPRESS_CONFIG_TOKEN);

  use(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): unknown {
    if (this._config.isProduction) {
      return helmet()(request, response, next);
    }

    return next();
  }
}
