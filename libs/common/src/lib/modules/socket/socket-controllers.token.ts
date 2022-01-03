/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container, Token } from 'typedi';

export const SOCKET_CONTROLLERS_TOKEN = new Token<
  Array<Constructable<CallableFunction>>
>('socket-controllers');
Container.set(SOCKET_CONTROLLERS_TOKEN, []);
