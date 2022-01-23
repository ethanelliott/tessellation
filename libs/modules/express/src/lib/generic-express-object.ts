/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export type GenericExpressObject<A = Array<unknown>, B = unknown> = (
  ...arguments_: A extends Array<unknown> ? A : [A]
) => B;
