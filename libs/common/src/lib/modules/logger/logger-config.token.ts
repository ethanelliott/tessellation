/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { LoggerConfig } from './logger-config';

export const LOGGER_CONFIG_TOKEN = new Token<LoggerConfig>('logger-config');
