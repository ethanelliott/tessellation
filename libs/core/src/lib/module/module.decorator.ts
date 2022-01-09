/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ComponentTypes } from '../component-types.enum';
import { ConstructableFrameworkLoader } from '../loader';
import { NonEmptyArray } from '../types';
import { FrameworkModuleOptions } from './framework-module-options';
import { FrameworkModulePrototype } from './framework-module-prototype';

/**
 * @param options
 */
export function Module(options: FrameworkModuleOptions): ClassDecorator {
  return (target): void => {
    const proto = target.prototype as FrameworkModulePrototype;

    proto.type = ComponentTypes.MODULE;

    proto.created = new Date().toISOString();

    proto.loaders =
      options.loaders as NonEmptyArray<ConstructableFrameworkLoader>;

    proto.providers = options.providers;

    proto.modules = options.modules;
  };
}
