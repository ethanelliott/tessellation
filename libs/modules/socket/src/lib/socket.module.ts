/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  Constructable,
  Module,
  ModuleWithProviders,
  NonEmptyArray,
} from '@tessellation/core';

import { SocketLoader } from './socket.loader';
import { SocketProvider } from './socket.provider';

@Module({
  loaders: [SocketLoader],
})
export class SocketModule {
  static withConfig(config: {
    controllers: NonEmptyArray<Constructable<unknown>>;
  }): ModuleWithProviders {
    if (config.controllers.length === 0) {
      throw new Error('Needs at least one controller');
    }

    return {
      frameworkModule: SocketModule,
      providers: [SocketProvider(config.controllers)],
    };
  }
}
