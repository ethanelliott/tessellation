/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ComponentTypes } from '../component-types.enum';
import { ConstructableWithPrototype } from '../constructable-with-prototype';
import { FrameworkSettings } from '../settings/framework-settings';
import { NonEmptyArray } from '../types';

export type FrameworkLoaderFunction = <T>(
  settings?: FrameworkSettings,
) => Promise<T> | Promise<void> | T | void;
export type FrameworkUnloaderFunction = <T>(
  settings?: FrameworkSettings,
) => Promise<T> | Promise<void> | T | void;

export interface FrameworkLoader {
  loader: () => FrameworkLoaderFunction;
  unloader?: () => FrameworkUnloaderFunction;
}

export enum FrameworkLoaderOrder {
  FIRST = 'FIRST',
  LAST = 'LAST',
  ANY = 'ANY',
}

export interface FrameworkLoaderPrototype {
  name: string;
  created: string;
  type: ComponentTypes.LOADER;
  deps?: NonEmptyArray<ConstructableFrameworkLoader>;
  order: FrameworkLoaderOrder;
}

export type ConstructableFrameworkLoader = ConstructableWithPrototype<
  FrameworkLoader,
  FrameworkLoaderPrototype
>;
