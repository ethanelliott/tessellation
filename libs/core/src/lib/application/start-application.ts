/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ConstructableFrameworkApplication } from './framework-application';

export const startApplication = (application: unknown): void => {
  const ConstructableApplication =
    application as ConstructableFrameworkApplication;
  const instance = new ConstructableApplication();

  if (typeof instance.start === 'function') {
    instance.start();
  } else {
    throw new Error('Invalid application, cannot start.');
  }
};
