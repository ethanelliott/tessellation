/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { ServerConfig } from './server-config';

export const SERVER_CONFIG_TOKEN = new Token<ServerConfig>('server-config');
