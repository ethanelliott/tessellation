/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from 'typedi';

import { FrameworkLoader } from '../loader';
import { FrameworkProvider } from '../provider/framework-provider';
import { NonEmptyArray } from '../types';
import { ModuleWithProviders } from './module-with-providers';

export interface FrameworkModuleOptions {
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  providers?: NonEmptyArray<FrameworkProvider<unknown>>;
  loaders?: NonEmptyArray<Constructable<FrameworkLoader>>;
}
