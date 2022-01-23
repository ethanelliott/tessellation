/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ConstructableFrameworkLoader } from '../loader';
import { GenericFrameworkProvider } from '../provider';
import { NonEmptyArray } from '../types';
import { ConstructableFrameworkModule } from './framework-module';
import { ModuleWithProviders } from './module-with-providers';

export interface FrameworkModuleOptions {
  modules?: NonEmptyArray<
    CallableFunction | ConstructableFrameworkModule | ModuleWithProviders
  >;
  providers?: NonEmptyArray<GenericFrameworkProvider>;
  loaders?: NonEmptyArray<CallableFunction | ConstructableFrameworkLoader>;
}
