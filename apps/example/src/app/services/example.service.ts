/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Service } from 'typedi';

@Service()
export class ExampleService {
  randomNumber(): number {
    return Math.random();
  }
}
