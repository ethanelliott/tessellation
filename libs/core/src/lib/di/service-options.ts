/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ServiceMetadata } from './service-metadata';

export type ServiceOptions<T = unknown> =
  | Omit<Partial<ServiceMetadata<T>>, 'factory' | 'type'>
  | Omit<Partial<ServiceMetadata<T>>, 'factory' | 'value'>
  | Omit<Partial<ServiceMetadata<T>>, 'type' | 'value'>;
