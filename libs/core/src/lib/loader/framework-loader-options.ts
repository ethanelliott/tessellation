/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from 'typedi';

import { NonEmptyArray } from '../types';
import { FrameworkLoader } from './framework-loader';

export interface FrameworkLoaderOptions {
  deps?: NonEmptyArray<Constructable<FrameworkLoader>>;
}
