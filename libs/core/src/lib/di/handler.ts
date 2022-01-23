/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../constructable';
import { ContainerInstance } from './container-instance';

export interface Handler<T = unknown> {
  object: Constructable<T>;

  propertyName?: string;

  index?: number;

  value: (container: ContainerInstance) => unknown;
}
