/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module, NonEmptyArray } from '@tessellation/core';
import { Constructable } from 'typedi';

import { DatabaseLoader } from './database.loader';
import { DatabaseProvider } from './database.provider';

@Module({
  providers: [DatabaseProvider],
  loaders: [DatabaseLoader],
})
export class DatabaseModule {
  static withConfig(config: {
    entities: NonEmptyArray<Constructable<unknown>>;
  }): CallableFunction {
    if (config.entities.length === 0) {
      throw new Error('Needs at least one entities');
    }

    return DatabaseModule;
  }
}
