/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from 'typedi';

import { FrameworkLoader } from '../loader';
import { FrameworkProvider } from '../provider/framework-provider';
import { NonEmptyArray } from '../types';
import { FrameworkModule } from './framework-module';
import { ModuleWithProviders } from './module-with-providers';

export interface FrameworkModuleInstance {
  name: string;
  created: string;
  modules?: NonEmptyArray<FrameworkModule | ModuleWithProviders>;
  providers?: NonEmptyArray<FrameworkProvider<unknown>>;
  loaders?: NonEmptyArray<Constructable<FrameworkLoader>>;
}
