/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { SocketConfig } from './socket-config';

export const SOCKET_CONFIG_TOKEN = new Token<SocketConfig>('socket-config');
