/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkProvider, NonEmptyArray } from '@tessellation/core';

import { SocketConfig } from './socket-config';
import { SOCKET_CONFIG_TOKEN } from './socket-config.token';

export const SocketProvider: (
  controllers: NonEmptyArray<CallableFunction>,
) => FrameworkProvider<SocketConfig> = (
  controllers: NonEmptyArray<CallableFunction>,
) => ({
  provide: SOCKET_CONFIG_TOKEN,
  useValue: (): SocketConfig => ({
    controllers,
  }),
});
