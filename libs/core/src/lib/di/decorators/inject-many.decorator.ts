/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../../constructable';
import { CannotInjectValueError } from '../cannot-inject-value.error';
import { Container } from '../container';
import { resolveToTypeWrapper } from '../resolve-to-type-wrapper';
import { ServiceIdentifier } from '../service-identifier';

/**
 * @param typeOrIdentifier
 */
export function InjectMany(
  typeOrIdentifier?:
    | ServiceIdentifier
    | ((type?: never) => Constructable<unknown>),
): CallableFunction {
  return function (
    target: object,
    propertyName: string | symbol,
    index?: number,
  ): void {
    const typeWrapper = resolveToTypeWrapper(
      typeOrIdentifier,
      target,
      propertyName,
      index,
    );

    if (
      typeWrapper === undefined ||
      typeWrapper.eagerType === undefined ||
      typeWrapper.eagerType === Object
    ) {
      throw new CannotInjectValueError(
        target as Constructable<unknown>,
        propertyName as string,
      );
    }

    Container.registerHandler({
      object: target as Constructable<unknown>,
      propertyName: propertyName as string,
      index: index,
      value: containerInstance => {
        const evaluatedLazyType = typeWrapper.lazyType();

        if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
          throw new CannotInjectValueError(
            target as Constructable<unknown>,
            propertyName as string,
          );
        }

        return containerInstance.getMany<unknown>(evaluatedLazyType);
      },
    });
  };
}
