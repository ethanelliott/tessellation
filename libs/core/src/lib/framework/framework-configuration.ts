/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AppConfig, GenericAppConfig } from '../app-config';
import { Token } from '../di';
import { ConstructableFrameworkLoader } from '../loader';
import { ModuleWithProviders } from '../module';
import { GenericFrameworkProvider } from '../provider';
import { NonEmptyArray } from '../types';

export interface FrameworkConfiguration<T extends AppConfig<GenericAppConfig>> {
  appConfig?: Token<T>;
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  providers?: NonEmptyArray<GenericFrameworkProvider>;
  loaders?: NonEmptyArray<ConstructableFrameworkLoader>;
}
