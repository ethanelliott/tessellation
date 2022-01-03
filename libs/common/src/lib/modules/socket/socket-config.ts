/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { NonEmptyArray } from '@tessellation/core';

export interface SocketConfig {
  controllers: NonEmptyArray<CallableFunction>;
}
