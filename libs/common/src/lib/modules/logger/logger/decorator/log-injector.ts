/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container } from 'typedi';

import { Logger } from '../logger';

export const LogInjector =
  (scope: string, customDecorator?: Array<string>) =>
  (
    object: Constructable<unknown>,
    propertyName: string,
    index?: number,
  ): void => {
    const logger = new Logger(scope, customDecorator);

    Container.registerHandler({
      object,
      propertyName,
      index,
      value: () => logger,
    });
  };
