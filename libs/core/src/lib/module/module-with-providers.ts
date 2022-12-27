/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { GenericFrameworkProvider } from '../provider';
import { NonEmptyArray } from '../types';

export interface ModuleWithProviders {
  frameworkModule: CallableFunction;
  providers: NonEmptyArray<GenericFrameworkProvider>;
}
