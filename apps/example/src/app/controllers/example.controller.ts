/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { InjectableJsonController } from '@tessellation/common';
import { Get } from 'routing-controllers';

import { ExampleService } from '../services/example.service';

@InjectableJsonController('/example')
export class ExampleController {
  constructor(private readonly _exampleService: ExampleService) {}

  @Get()
  randomNumber(): Record<string, number> {
    return {
      rand: this._exampleService.randomNumber(),
    };
  }
}
