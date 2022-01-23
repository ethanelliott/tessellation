/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export declare type Constructable<T> = new (...arguments_: Array<unknown>) => T;

export interface ConstructableWithPrototype<T, R>
  extends Constructable<T>,
    NewableFunction {
  prototype: R & Record<string, unknown>;
}

export interface AbstractConstructable<T> extends NewableFunction {
  prototype: Record<string, unknown> & T;
}
