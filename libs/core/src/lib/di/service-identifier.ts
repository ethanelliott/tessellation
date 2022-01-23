/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AbstractConstructable, Constructable } from '../constructable';
import { Token } from './token';

export type ServiceIdentifier<T = unknown> =
  | AbstractConstructable<T>
  | CallableFunction
  | Constructable<T>
  | Token<T>
  | string;
