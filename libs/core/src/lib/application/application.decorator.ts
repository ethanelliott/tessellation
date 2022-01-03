/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { GenericAppConfig } from '../app-config';
import { Framework } from '../framework';
import { FrameworkApplicationOptions } from './framework-application-options';

export const Application =
  <T extends GenericAppConfig>(
    options: FrameworkApplicationOptions<T>,
  ): ClassDecorator =>
  (target: CallableFunction): void => {
    const proto = target.prototype as Record<string, unknown>;

    Object.entries(options).forEach(([key, value]) => {
      proto[key] = value;
    });

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
