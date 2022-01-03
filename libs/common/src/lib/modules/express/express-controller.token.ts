/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container, Token } from 'typedi';

import { GenericExpressObject } from './generic-express-object';

export const EXPRESS_CONTROLLER_TOKEN = new Token<
  Array<Constructable<GenericExpressObject>>
>('express-controllers');
Container.set(EXPRESS_CONTROLLER_TOKEN, []);
