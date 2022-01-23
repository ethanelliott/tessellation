/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  Loader,
} from '@tessellation/core';
import { ExpressLoader } from '@tessellation/express';
import { Server } from 'http';

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
