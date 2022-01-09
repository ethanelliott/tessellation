/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { NonEmptyArray } from '../types';
import { FrameworkLoaderOrder } from './framework-loader';

export interface FrameworkLoaderOptions {
  deps?: NonEmptyArray<CallableFunction>;
  order?: FrameworkLoaderOrder;
}
