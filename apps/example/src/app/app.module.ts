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

@Module({
  modules: [
    BannerModule,
    LoggerModule,
    ServerModule,
    ControllerModule,
    SwaggerModule,
    PrometheusModule,
  ],
})
export class AppModule {}
