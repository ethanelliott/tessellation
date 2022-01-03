/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  BannerModule,
  ExpressModule,
  LoggerModule,
  PrometheusModule,
  ServerModule,
  SwaggerModule,
} from '@tessellation/common';
import { Application } from '@tessellation/core';

import { ExampleController } from './app/controllers/example.controller';
import { APP_CONFIG_TOKEN, AppConfigProvider } from './app-config';

@Application({
  appConfigToken: APP_CONFIG_TOKEN,
  modules: [
    LoggerModule,
    BannerModule,
    ServerModule,
    ExpressModule.withConfig({
      controllers: [ExampleController],
    }),
    SwaggerModule,
    PrometheusModule,
  ],
  providers: [AppConfigProvider],
})
export class ExampleApp {}
