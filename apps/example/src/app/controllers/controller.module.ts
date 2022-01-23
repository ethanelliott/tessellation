/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';
import { ExpressModule } from '@tessellation/express';

import { ExampleController } from './example.controller';

@Module({
  modules: [
    ExpressModule.withConfig({
      controllers: [ExampleController],
    }),
  ],
})
export class ControllerModule {}
