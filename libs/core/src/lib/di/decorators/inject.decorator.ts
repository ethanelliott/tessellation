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
export function Inject(
  typeOrIdentifier?:
    | ServiceIdentifier
    | ((type?: never) => Constructable<unknown>),
): ParameterDecorator | PropertyDecorator {
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

    /** If no type was inferred, or the general Object type was inferred we throw an error. */
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

        /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */
        if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
          throw new CannotInjectValueError(
            target as Constructable<unknown>,
            propertyName as string,
          );
        }

        return containerInstance.get<unknown>(evaluatedLazyType);
      },
    });
  };
}
