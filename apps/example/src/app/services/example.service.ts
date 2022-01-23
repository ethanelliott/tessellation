/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Service } from '@tessellation/core';

@Service()
export class ExampleService {
  randomNumber(): number {
    return Math.random();
  }
}
