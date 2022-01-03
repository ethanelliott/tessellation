/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkProvider } from '../provider/framework-provider';
import { NonEmptyArray } from '../types';

export interface ModuleWithProviders {
  frameworkModule: CallableFunction;
  providers: NonEmptyArray<FrameworkProvider<unknown>>;
}
