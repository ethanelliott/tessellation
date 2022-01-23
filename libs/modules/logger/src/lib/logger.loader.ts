/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  Loader,
} from '@tessellation/core';
import { Format } from 'logform';
import { createLogger, format, transports } from 'winston';

import { LOGGER_TOKEN } from './logger.token';
import { LoggerWrapper } from './logger/logger-wrapper';
import { LOGGER_CONFIG_TOKEN } from './logger-config.token';

interface Info {
  timestamp: string;
  level: string;
  message: string;
  durationMs: number;
}

@Loader()
export class LoggerLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    const { combine, timestamp, prettyPrint, printf } = format;

    const developmentFormat = (): Format => {
      const formatMessage = (info: Info): string =>
        `[${info.timestamp}] [${info.level}] ${info.message} ${
          info.durationMs ? `Timer: ${info.durationMs}ms` : ''
        }`;
      const formatError = (info: Info): string =>
        `[${info.timestamp}] [${info.level}] ${info.message}`;
      const selectFormat = (info: Info): string =>
        info instanceof Error ? formatError(info) : formatMessage(info);

      return printf(selectFormat);
    };

    const consoleLogFormat = (): Format =>
      combine(timestamp(), developmentFormat());

    return (): void => {
      const config = Container.get(LOGGER_CONFIG_TOKEN);
      const logger = createLogger({
        level: config.logLevel,
        format: combine(timestamp(), prettyPrint()),
        transports: [
          new transports.Console({ format: consoleLogFormat() }),
          new transports.File({ filename: 'error.log', level: 'error' }),
        ],
      });

      Container.set(LOGGER_TOKEN, new LoggerWrapper(logger));
    };
  }
}
