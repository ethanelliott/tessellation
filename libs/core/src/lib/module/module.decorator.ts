/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkModuleOptions } from './framework-module-options';

/**
 * @param options
 */
export function Module(options: FrameworkModuleOptions): ClassDecorator {
  return (target): void => {
    const proto = target.prototype as Record<string, unknown>;

    proto.created = new Date().toISOString();

    proto.loaders = options.loaders ?? [];

    proto.providers = options.providers ?? [];

    proto.modules = options.modules ?? [];
  };
}
