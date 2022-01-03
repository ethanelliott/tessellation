/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export interface LoggerInterface {
  debug: (...arguments_: Array<unknown>) => void;
  info: (...arguments_: Array<unknown>) => void;
  warn: (...arguments_: Array<unknown>) => void;
  error: (...arguments_: Array<unknown>) => void;
}
