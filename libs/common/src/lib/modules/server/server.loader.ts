/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  Loader,
} from '@tessellation/core';
import { Server } from 'http';
import { Container } from 'typedi';

import { ExpressLoader } from '../express';
import { SERVER_CONFIG_TOKEN } from './server-config.token';

@Loader({
  deps: [ExpressLoader],
})
export class ServerLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (settings?: FrameworkSettings): void => {
      if (settings) {
        const config = Container.get(SERVER_CONFIG_TOKEN);

        settings.getValue<Server>('server').listen(config.port);
      }
    };
  }
}
