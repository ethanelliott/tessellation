/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Module, NonEmptyArray } from '@tessellation/core';

import { ExpressLoader } from './express.loader';
import { ExpressProvider } from './express.provider';

@Module({
  providers: [ExpressProvider],
  loaders: [ExpressLoader],
})
export class ExpressModule {
  static withConfig(config: {
    controllers: NonEmptyArray<Constructable<unknown>>;
  }): CallableFunction {
    if (config.controllers.length === 0) {
      throw new Error('Needs at least one controller');
    }

    return ExpressModule;
  }
}
