/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ComponentTypes } from '../component-types.enum';
import { NonEmptyArray } from '../types';
import {
  ConstructableFrameworkLoader,
  FrameworkLoaderOrder,
  FrameworkLoaderPrototype,
} from './framework-loader';
import { FrameworkLoaderOptions } from './framework-loader-options';

/**
 * @param options
 */
export function Loader(options?: FrameworkLoaderOptions): ClassDecorator {
  return (target): void => {
    const proto = target.prototype as FrameworkLoaderPrototype;

    proto.type = ComponentTypes.LOADER;

    proto.name = target.name;

    proto.created = new Date().toISOString();

    proto.order = options?.order ?? FrameworkLoaderOrder.ANY;

    proto.deps = options?.deps as
      | NonEmptyArray<ConstructableFrameworkLoader>
      | undefined;
  };
}
