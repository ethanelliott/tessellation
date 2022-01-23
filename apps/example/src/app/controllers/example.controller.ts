/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { InjectableJsonController } from '@tessellation/express';
import { Get } from 'routing-controllers';

import { ExampleService } from '../services/example.service';

@InjectableJsonController('/example')
export class ExampleController {
  constructor(private readonly _exampleService: ExampleService) {}

  @Get()
  getRandomNumber(): Record<string, number> {
    return {
      rand: this._exampleService.randomNumber(),
    };
  }
}
