/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { GenericAppConfig } from './app-config';
import { ConstructableFrameworkLoader } from './loader';
import { ModuleWithProviders } from './module';
import { GenericFrameworkProvider } from './provider/framework-provider';
import { NonEmptyArray } from './types';

export interface FrameworkConfiguration<T extends GenericAppConfig> {
  appConfig?: Token<T>;
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  providers?: NonEmptyArray<GenericFrameworkProvider>;
  loaders?: NonEmptyArray<ConstructableFrameworkLoader>;
}
