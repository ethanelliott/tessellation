/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../constructable';

/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
export class CannotInjectValueError extends Error {
  name = 'CannotInjectValueError';

  get message(): string {
    return `Cannot inject value into "${this._target.constructor.name}.${this._propertyName}".
Please make sure you setup reflect-metadata properly and you don't use interfaces without service tokens as injection value.`;
  }

  constructor(
    private readonly _target: Constructable<unknown>,
    private readonly _propertyName: string,
  ) {
    super();
  }
}
