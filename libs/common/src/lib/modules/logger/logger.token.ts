/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { LoggerWrapper } from './logger';

export const LOGGER_TOKEN = new Token<LoggerWrapper>('logger');
