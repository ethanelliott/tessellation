/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ComponentTypes } from '../component-types.enum';
import { ConstructableFrameworkLoader } from '../loader';
import { GenericFrameworkProvider } from '../provider';
import { NonEmptyArray } from '../types';
import { ConstructableFrameworkModule } from './framework-module';
import { ModuleWithProviders } from './module-with-providers';

export interface FrameworkModulePrototype {
  name: string;
  created: string;
  type: ComponentTypes.MODULE;
  modules?: NonEmptyArray<
    CallableFunction | ConstructableFrameworkModule | ModuleWithProviders
  >;
  providers?: NonEmptyArray<GenericFrameworkProvider>;
  loaders?: NonEmptyArray<ConstructableFrameworkLoader>;
}
