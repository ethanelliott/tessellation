/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ConstructableWithPrototype } from '../constructable';
import { FrameworkModulePrototype } from './framework-module-prototype';

export type ConstructableFrameworkModule = ConstructableWithPrototype<
  CallableFunction,
  FrameworkModulePrototype
>;
