/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

export const APP_CONFIG_TOKEN_SYMBOL = Symbol('appConfigToken');

export interface FrameworkProvider<T> {
  provide: Token<T> | typeof APP_CONFIG_TOKEN_SYMBOL;
  deps?: Array<Token<unknown> | typeof APP_CONFIG_TOKEN_SYMBOL>;
  useValue: ((...arguments_) => Promise<T>) | ((...arguments_) => T);
}

export type GenericFrameworkProvider = FrameworkProvider<unknown>;
