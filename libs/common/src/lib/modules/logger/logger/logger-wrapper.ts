/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { blueBright, cyan } from 'chalk';
import { Container } from 'typedi';
import { Logger as WinstonLogger } from 'winston';

import { LOGGER_CONFIG_TOKEN, LoggerConfig } from '../';

export type AvailableLogLevel =
  | 'data'
  | 'debug'
  | 'error'
  | 'help'
  | 'http'
  | 'info'
  | 'input'
  | 'prompt'
  | 'silly'
  | 'verbose'
  | 'warn';

export class LoggerWrapper {
  private readonly _config: LoggerConfig;

  constructor(private readonly _logger?: WinstonLogger) {
    this._config = Container.get(LOGGER_CONFIG_TOKEN);
  }

  log(
    level: AvailableLogLevel,
    message: Array<unknown>,
    scope?: string,
    customDecorators?: Array<string>,
  ): void {
    if (this._logger !== undefined) {
      message = message.map(this._messageParsing());
      this._logger[level](
        `${LoggerWrapper._formatScope(scope)}${this._formatCustomDecorators(
          customDecorators,
        )} ${message.join(' ')}`,
      );
    }
  }

  private _messageParsing() {
    return (m): string => {
      if (m === undefined || m === null) {
        return '';
      }

      if (typeof m === 'string') {
        return m;
      }

      if (m instanceof Error) {
        return this._config.isProduction
          ? `${m.name}: ${m.message}`
          : `${m.name}: ${m.message}\n${m.stack ?? ''}`;
      } else if ('toString' in m && typeof m.toString === 'function') {
        return (m as { toString: () => string }).toString();
      }

      return JSON.stringify(m);
    };
  }

  private _formatCustomDecorators(customDecorators?: Array<string>): string {
    return customDecorators?.map(d => `[${cyan(d)}]`).join('') ?? '';
  }

  private static _formatScope(scope?: string): string {
    return `[${blueBright(scope)}]`;
  }
}
