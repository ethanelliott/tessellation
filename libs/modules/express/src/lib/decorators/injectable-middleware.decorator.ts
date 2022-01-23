/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Service } from '@tessellation/core';
import { Middleware } from 'routing-controllers';

/**
 * @param {...any} arguments_
 */
export function InjectableMiddleware(
  ...arguments_: Parameters<typeof Middleware>
) {
  return (target: CallableFunction): void => {
    Service()(target);
    Middleware(...arguments_)(target);
  };
}
