/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';

import { SwaggerLoader } from './swagger.loader';
import { SwaggerProvider } from './swagger.provider';

@Module({
  providers: [SwaggerProvider],
  loaders: [SwaggerLoader],
})
export class SwaggerModule {}
