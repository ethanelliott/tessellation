/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export declare type NonEmptyArray<T> =
  | readonly [T, ...Array<T>]
  | [T, ...Array<T>];
