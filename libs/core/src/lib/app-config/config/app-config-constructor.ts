/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AppConfig } from './app-config';
import { deepGet } from './deep-get';
import { GenericAppConfig } from './generic-app-config';

export class AppConfigConstructor<T extends GenericAppConfig>
  implements AppConfig<T>
{
  config: T;

  constructor(config: T) {
    this.config = <T>Object.freeze(config);
  }

  get<P>(path: string, required: boolean = false): P {
    return deepGet(this.config as Record<string, unknown>, path, required) as P;
  }
}
