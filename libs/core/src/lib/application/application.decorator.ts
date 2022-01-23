/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AppConfig, GenericAppConfig } from '../app-config';
import { ComponentTypes } from '../component-types.enum';
import { Framework } from '../framework';
import { FrameworkApplicationOptions } from './framework-application-options';
import { FrameworkApplicationPrototype } from './framework-application-prototype';

export const Application =
  <T extends AppConfig<GenericAppConfig>>(
    options: FrameworkApplicationOptions<T>,
  ): ClassDecorator =>
  (target: CallableFunction): void => {
    const proto = target.prototype as FrameworkApplicationPrototype;

    proto.type = ComponentTypes.APPLICATION;

    proto.modules = options.modules;
    proto.loaders = options.loaders;
    proto.providers = options.providers;
    proto.appConfigToken = options.appConfigToken;

    proto.created = new Date().toISOString();

    proto.start = (): void => {
      Framework.configure({
        appConfig: options.appConfigToken,
        modules: options.modules,
        providers: options.providers,
        loaders: options.loaders,
      })
        .start()
        .catch(error => {
          console.error(error);
        });
    };
  };
