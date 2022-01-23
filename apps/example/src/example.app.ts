/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Application } from '@tessellation/core';

import { AppModule } from './app/app.module';
import { APP_CONFIG_TOKEN, AppConfigProvider } from './app-config';

@Application({
  appConfigToken: APP_CONFIG_TOKEN,
  modules: [AppModule],
  providers: [AppConfigProvider],
})
export class ExampleApp {}
