/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import * as chalk from 'chalk';
import * as express from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';

import { Logger } from '../../logger';
import { InjectableMiddleware } from '../decorators';

@InjectableMiddleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  private readonly _log = new Logger(__filename, [chalk.yellow('EXPRESS')]);

  use(
    request: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    this._log.debug(
      `(${this._colourizeHttpMethod(request.method)}) ${request.path}`,
    );

    return next();
  }

  private _colourizeHttpMethod(method: string): string {
    switch (method) {
      case 'GET':
        return chalk.blue(method);

      case 'POST':
        return chalk.green(method);

      case 'DELETE':
        return chalk.red(method);

      case 'PUT':
        return chalk.yellow(method);

      default:
        return method;
    }
  }
}
