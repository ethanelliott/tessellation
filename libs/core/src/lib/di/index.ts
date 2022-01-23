/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

type ReflectType = Record<string, unknown | undefined> | undefined;

if (
  (Reflect as ReflectType) === undefined ||
  (Reflect as ReflectType)?.getMetadata === undefined
) {
  throw new Error(
    'Please import the "reflect-metadata" package at the very first line of your application.',
  );
}

export * from './cannot-inject-value.error';
export * from './cannot-instantiate-value.error';
export { Container } from './container';
export { ContainerInstance } from './container-instance';
export * from './decorators/inject.decorator';
export * from './decorators/inject-many.decorator';
export * from './decorators/service.decorator';
export { Handler } from './handler';
export { ServiceIdentifier } from './service-identifier';
export { ServiceMetadata } from './service-metadata';
export * from './service-not-found.error';
export { ServiceOptions } from './service-options';
export { Token } from './token';
