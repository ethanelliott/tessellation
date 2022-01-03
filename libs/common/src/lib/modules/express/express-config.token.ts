/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { ExpressConfig } from './express-config';

export const EXPRESS_CONFIG_TOKEN = new Token<ExpressConfig>('express-config');
