/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../constructable';
import { ServiceIdentifier } from './service-identifier';

export interface ServiceMetadata<Type = unknown> {
  id: ServiceIdentifier;

  type: Constructable<Type> | null;

  global: boolean;

  transient: boolean;

  multiple: boolean;

  eager?: boolean;

  factory: CallableFunction | [Constructable<unknown>, string] | undefined;

  value: symbol | unknown;
}
