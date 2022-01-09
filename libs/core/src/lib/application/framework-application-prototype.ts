/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  GenericAppConfig,
  ModuleWithProviders,
  NonEmptyArray,
} from '@tessellation/core';
import { Token } from 'typedi';

import { ComponentTypes } from '../component-types.enum';
import { ConstructableFrameworkLoader } from '../loader';
import { GenericFrameworkProvider } from '../provider/framework-provider';

export interface FrameworkApplicationPrototype {
  appConfigToken?: Token<GenericAppConfig>;
  providers: NonEmptyArray<GenericFrameworkProvider> | undefined;
  loaders?: NonEmptyArray<ConstructableFrameworkLoader>;
  modules?: NonEmptyArray<CallableFunction | ModuleWithProviders>;
  created: string;
  type: ComponentTypes.APPLICATION;
  start: () => void;
}
