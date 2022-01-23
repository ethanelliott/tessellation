/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from '@tessellation/core';

import { LoggerWrapper } from './logger/logger-wrapper';

export const LOGGER_TOKEN = new Token<LoggerWrapper>('logger');
