/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ConstructableWithPrototype } from '../constructable-with-prototype';
import { FrameworkModulePrototype } from './framework-module-prototype';

export type ConstructableFrameworkModule = ConstructableWithPrototype<
  CallableFunction,
  FrameworkModulePrototype
>;
