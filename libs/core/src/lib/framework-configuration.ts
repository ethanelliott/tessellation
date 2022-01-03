/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Token } from 'typedi';

import { GenericAppConfig } from './app-config';
import { FrameworkLoader } from './loader';
import { ModuleWithProviders } from './module';
import { FrameworkProvider } from './provider/framework-provider';
import { NonEmptyArray } from './types';

export interface FrameworkConfiguration<T extends GenericAppConfig> {
  appConfig?: Token<T>;
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  providers?: NonEmptyArray<FrameworkProvider<unknown>>;
  loaders?: NonEmptyArray<Constructable<FrameworkLoader>>;
}
