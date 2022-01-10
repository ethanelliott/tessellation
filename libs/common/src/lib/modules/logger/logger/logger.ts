/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { sep } from 'path';
import { Container } from 'typedi';

import { LOGGER_TOKEN } from '../';
import { LoggerInterface } from './logger-interface';
import { AvailableLogLevel, LoggerWrapper } from './logger-wrapper';

export class Logger implements LoggerInterface {
  static DEFAULT_SCOPE = 'app';

  private readonly _logger: LoggerWrapper;

  private readonly _scope: string;

  private readonly _customDecorators: Array<string>;

  constructor(scope?: string, customDecorators?: Array<string>) {
    this._scope =
      scope === undefined || scope.includes('node_modules')
        ? Logger._parsePathToScope(Logger.DEFAULT_SCOPE)
        : Logger._parsePathToScope(scope);
    this._customDecorators = customDecorators ?? [];
    this._logger = Container.get(LOGGER_TOKEN);
  }

  silly(...arguments_: Array<unknown>): void {
    this.log('silly', arguments_);
  }

  debug(...arguments_: Array<unknown>): void {
    this.log('debug', arguments_);
  }

  info(...arguments_: Array<unknown>): void {
    this.log('info', arguments_);
  }

  warn(...arguments_: Array<unknown>): void {
    this.log('warn', arguments_);
  }

  error(...arguments_: Array<unknown>): void {
    this.log('error', arguments_);
  }

  log(level: AvailableLogLevel, message: Array<unknown>): void {
    this._logger.log(level, message, this._scope, this._customDecorators);
  }

  private static _parsePathToScope(filepath: string): string {
    if (filepath.includes(sep)) {
      const sourceReplaceRegex = new RegExp(`\\${sep}src`, 'g');
      const distReplaceRegex = new RegExp(`\\${sep}dist`, 'g');

      filepath = filepath.replace(process.cwd(), '');
      filepath = filepath.replace(sourceReplaceRegex, '');
      filepath = filepath.replace(distReplaceRegex, '');
      filepath = filepath.replace('.ts', '');
      filepath = filepath.replace('.js', '');
      filepath = filepath.replace(/[/\\]/g, ':');
      filepath = filepath.slice(1);
    }

    return filepath;
  }
}
