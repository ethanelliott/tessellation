/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkApplication } from './framework-application';

export const startApplication = (application: unknown): void => {
  const ConstructableApplication = application as FrameworkApplication;
  const instance = new ConstructableApplication();

  if (typeof instance.start === 'function') {
    instance.start();
  } else {
    throw new Error('Invalid application, cannot start.');
  }
};
