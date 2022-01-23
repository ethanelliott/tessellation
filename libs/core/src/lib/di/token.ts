/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export class Token<T> {
  private readonly _value: T;

  constructor(public name?: string) {}
}
