/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from 'typedi';

import { FrameworkModuleInstance } from './framework-module-instance';

export type FrameworkModule = Constructable<FrameworkModuleInstance>;
