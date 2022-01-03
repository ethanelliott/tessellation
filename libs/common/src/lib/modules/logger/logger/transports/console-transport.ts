/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import * as chalk from 'chalk';
import * as Transport from 'winston-transport';

export class ConsoleTransport extends Transport {
  log(info: Record<string, string>, next: () => void): void {
    // eslint-disable-next-line no-console
    console.log(
      `[${chalk.magenta(info.timestamp)}][${this.colourizeLevel(info.level)}]${
        info.message
      }`,
    );
    next();
  }

  colourizeLevel(level: string): string {
    switch (level) {
      case 'error':
        return chalk.red(level);

      case 'warn':
        return chalk.redBright(level);

      case 'help':
        return chalk.cyan(level);

      case 'info':
        return chalk.green(level);

      case 'debug':
        return chalk.blue(level);

      case 'silly':
        return chalk.magenta(level);

      default:
        return level;
    }
  }
}
