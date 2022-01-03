/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { GenericAppConfig } from './generic-app-config';

export interface AppConfig<T extends GenericAppConfig> {
  get: <P, R extends boolean>(
    path: string,
    required?: R,
  ) => R extends true ? P : P | undefined;
  config: T;
}
