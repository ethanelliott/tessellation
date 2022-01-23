/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ConstructableWithPrototype } from '../constructable';
import { FrameworkApplicationInstance } from './framework-application-instance';
import { FrameworkApplicationPrototype } from './framework-application-prototype';

export type ConstructableFrameworkApplication = ConstructableWithPrototype<
  FrameworkApplicationInstance,
  FrameworkApplicationPrototype
>;
