/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { blue, cyan, green, magenta, red, redBright } from 'chalk';

export class ConsoleTransport {
  log(info: Record<string, string>, next: () => void): void {
    // eslint-disable-next-line no-console
    console.log(
      `[${magenta(info.timestamp)}][${this.colourizeLevel(info.level)}]${
        info.message
      }`,
    );
    next();
  }

  colourizeLevel(level: string): string {
    switch (level) {
      case 'error':
        return red(level);

      case 'warn':
        return redBright(level);

      case 'help':
        return cyan(level);

      case 'info':
        return green(level);

      case 'debug':
        return blue(level);

      case 'silly':
        return magenta(level);

      default:
        return level;
    }
  }
}
