/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { NonEmptyArray } from '@tessellation/core';

export interface ExpressConfig {
  isProduction: boolean;
  environment: string;
  name: string;
  version: string;
  description: string;
  routePrefix: string;
  middlewares: NonEmptyArray<unknown>;
  helmet: boolean;
  actuator: boolean;
  // TODO: add providers for these
  authorizationChecker?: () => void;
  currentUserChecker?: () => void;
}
