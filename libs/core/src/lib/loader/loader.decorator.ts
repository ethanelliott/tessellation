/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkLoaderOptions } from './framework-loader-options';

/**
 * @param options
 */
export function Loader(options?: FrameworkLoaderOptions): ClassDecorator {
  return (target): void => {
    const proto = target.prototype as Record<string, unknown>;

    proto.created = new Date().toISOString();

    proto.deps = options?.deps ?? [];
  };
}
