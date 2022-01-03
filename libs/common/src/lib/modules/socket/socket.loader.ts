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
import * as EventEmitter from 'events';
import { Server as HTTPServer } from 'http';
import * as socketIO from 'socket.io';
import { useContainer, useSocketServer } from 'socket-controllers';
import { Container } from 'typedi';

import { ExpressLoader } from '../express';
import { SOCKET_CONFIG_TOKEN } from './socket-config.token';
import { SOCKET_CONTROLLERS_TOKEN } from './socket-controllers.token';

export interface Socket extends EventEmitter {
  id: string;
}

@Loader({
  deps: [ExpressLoader],
})
export class SocketLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    useContainer(Container);

    return (settings?: FrameworkSettings): void => {
      const config = Container.get(SOCKET_CONFIG_TOKEN);

      if (config.controllers.length === 0) {
        throw new Error('Missing Socket Controllers');
      }

      const controllers = Container.get(SOCKET_CONTROLLERS_TOKEN);

      if (settings) {
        const server = settings.getValue<HTTPServer>('server');
        const socketOnExpress = (
          socketIO as (
            server: HTTPServer,
            options: Record<string, string>,
          ) => unknown
        )(server, { origin: '*:*' });
        const socketApp = useSocketServer(socketOnExpress, {
          controllers: [...controllers],
        });

        settings.setValue('socket-app', socketApp);
      }
    };
  }
}
