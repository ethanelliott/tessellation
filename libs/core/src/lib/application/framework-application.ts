/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from 'typedi';

import { FrameworkApplicationInstance } from './framework-application-instance';

export type FrameworkApplication = Constructable<FrameworkApplicationInstance>;
