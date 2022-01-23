/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';

import { ServerLoader } from './server.loader';
import { ServerProvider } from './server.provider';

@Module({
  providers: [ServerProvider],
  loaders: [ServerLoader],
})
export class ServerModule {}
