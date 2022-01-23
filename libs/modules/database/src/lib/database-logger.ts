/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AvailableLogLevel, Logger } from '@tessellation/logger';
import { Logger as TypeormLogger } from 'typeorm';

export const databaseLogger = (logger: Logger): Partial<TypeormLogger> => ({
  log(level: 'info' | 'log' | 'warn', message: unknown): void {
    logger.log(level as AvailableLogLevel, [message]);
  },
  logQuery(query: string, parameters?: Array<unknown>): void {
    logger.silly(query, parameters);
  },
  logMigration(message: string): void {
    logger.silly(message);
  },
  logSchemaBuild(message: string): void {
    logger.silly(message);
  },
  logQueryError(
    error: Error | string,
    query: string,
    parameters?: Array<unknown>,
  ): void {
    logger.error(error, query, parameters);
  },
  logQuerySlow(time: number, query: string, parameters?: Array<unknown>): void {
    logger.silly(time, query, parameters);
  },
});
