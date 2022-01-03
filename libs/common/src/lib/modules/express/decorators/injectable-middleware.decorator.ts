/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Middleware } from 'routing-controllers';
import { Service } from 'typedi';

/**
 * @param {...any} arguments_
 */
export function InjectableMiddleware(
  ...arguments_: Parameters<typeof Middleware>
) {
  return (target: unknown): void => {
    Service()(target);
    Middleware(...arguments_)(target);
  };
}
