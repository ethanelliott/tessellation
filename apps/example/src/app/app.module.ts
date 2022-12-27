/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { BannerModule } from '@tessellation/banner';
import { Module } from '@tessellation/core';
import { LoggerModule } from '@tessellation/logger';
import { PrometheusModule } from '@tessellation/prometheus';
import { ServerModule } from '@tessellation/server';
import { SwaggerModule } from '@tessellation/swagger';

import { ControllerModule } from './controllers/controller.module';
import { ResolversModule } from './resolvers/resolvers.module';


@Module({
  modules: [
    BannerModule,
    LoggerModule,
    ServerModule,
    ControllerModule,
    SwaggerModule,
    PrometheusModule,
    ResolversModule,
  ],
})
export class AppModule {}
