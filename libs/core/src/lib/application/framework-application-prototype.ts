/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  AppConfig,
  GenericAppConfig,
  ModuleWithProviders,
  NonEmptyArray,
} from '@tessellation/core';

import { ComponentTypes } from '../component-types.enum';
import { Token } from '../di';
import { ConstructableFrameworkLoader } from '../loader';
import { GenericFrameworkProvider } from '../provider';

export interface FrameworkApplicationPrototype {
  appConfigToken?: Token<AppConfig<GenericAppConfig>>;
  providers: NonEmptyArray<GenericFrameworkProvider> | undefined;
  loaders?: NonEmptyArray<ConstructableFrameworkLoader>;
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  created: string;
  type: ComponentTypes.APPLICATION;
  start: () => void;
}
