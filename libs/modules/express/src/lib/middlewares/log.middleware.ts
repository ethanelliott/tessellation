/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Logger } from '@tessellation/logger';
import { blue, green, red, yellow } from 'chalk';
import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';

import { InjectableMiddleware } from '../decorators';

@InjectableMiddleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {
  private readonly _log = new Logger(__filename, [yellow('EXPRESS')]);

  use(request: Request, res: Response, next: NextFunction): void {
    this._log.debug(
      `(${this._colourizeHttpMethod(request.method)}) ${request.path}`,
    );

    return next();
  }

  private _colourizeHttpMethod(method: string): string {
    switch (method) {
      case 'GET':
        return blue(method);

      case 'POST':
        return green(method);

      case 'DELETE':
        return red(method);

      case 'PUT':
        return yellow(method);

      default:
        return method;
    }
  }
}
