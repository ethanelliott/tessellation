/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../constructable';
import { GenericIdentifier } from './generic-identifier';
import { notNullOrUndefined } from './not-null-or-undefined';
import { ServiceIdentifier } from './service-identifier';
import { Token } from './token';

export type TypeOrIdentifier =
  | ServiceIdentifier
  | ((type?: never) => Constructable<unknown>)
  | null
  | undefined;

export type EagerType = ServiceIdentifier | null | undefined;
export type LazyType = (type?: unknown) => ServiceIdentifier | undefined;

export interface TypeWrapper {
  eagerType: EagerType;
  lazyType: LazyType;
}

export type MaybeTypeWrapper = TypeWrapper | undefined;

export interface ReflectType {
  getMetadata: (
    a: string,
    b: object,
    c?: GenericIdentifier,
  ) => Array<unknown> | unknown;
}

const toTypeWrapper = (
  eagerType: EagerType,
  lazyType?: LazyType,
): TypeWrapper => {
  if (lazyType !== undefined) {
    return {
      eagerType,
      lazyType,
    } as TypeWrapper;
  }

  return {
    eagerType,
    lazyType: () => eagerType,
  } as TypeWrapper;
};

/**
 * @param typeOrIdentifier
 * @param target
 * @param propertyName
 * @param index
 */
export function resolveToTypeWrapper(
  typeOrIdentifier: TypeOrIdentifier,
  target: object,
  propertyName: GenericIdentifier,
  index?: number,
): MaybeTypeWrapper {
  if (notNullOrUndefined(typeOrIdentifier)) {
    if (
      typeof typeOrIdentifier === 'string' ||
      typeOrIdentifier instanceof Token
    ) {
      return toTypeWrapper(typeOrIdentifier);
    }

    if (typeof typeOrIdentifier === 'function') {
      return toTypeWrapper(
        null,
        () => (typeOrIdentifier as CallableFunction)() as LazyType,
      );
    }
  }
  if (notNullOrUndefined(propertyName)) {
    const identifier: ServiceIdentifier = (
      Reflect as unknown as ReflectType
    ).getMetadata('design:type', target, propertyName) as ServiceIdentifier;

    return toTypeWrapper(identifier);
  }
  if (typeof index == 'number' && Number.isInteger(index)) {
    const parameterTypes: Array<ServiceIdentifier> = (
      Reflect as unknown as ReflectType
    ).getMetadata(
      'design:paramtypes',
      target,
      propertyName,
    ) as Array<ServiceIdentifier>;
    const identifier = parameterTypes[index];

    return toTypeWrapper(identifier);
  }
}
