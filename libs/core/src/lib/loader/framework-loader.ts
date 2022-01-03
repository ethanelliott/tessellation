/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkSettings } from '../settings/framework-settings';

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
