/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';

import { LoggerLoader } from './logger.loader';
import { LoggerProvider } from './logger.provider';

@Module({
  providers: [LoggerProvider],
  loaders: [LoggerLoader],
})
export class LoggerModule {}
