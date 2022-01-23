/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable } from '../../constructable';
import { Container } from '../container';
import { EMPTY_VALUE } from '../empty';
import { ServiceIdentifier } from '../service-identifier';
import { ServiceMetadata } from '../service-metadata';
import { ServiceOptions } from '../service-options';
import { Token } from '../token';

/**
 * @param optionsOrServiceIdentifier
 */
export function Service<T>(
  optionsOrServiceIdentifier?: ServiceOptions<T> | Token<T> | string,
): ClassDecorator {
  return (targetConstructor): void => {
    const serviceMetadata: ServiceMetadata<T> = {
      id: targetConstructor,
      type: targetConstructor as unknown as Constructable<T>,
      factory: undefined,
      multiple: false,
      global: false,
      eager: false,
      transient: false,
      value: EMPTY_VALUE,
    };

    if (
      optionsOrServiceIdentifier instanceof Token ||
      typeof optionsOrServiceIdentifier === 'string'
    ) {
      serviceMetadata.id = optionsOrServiceIdentifier;
    } else if (optionsOrServiceIdentifier) {
      serviceMetadata.id =
        ((optionsOrServiceIdentifier as ServiceMetadata).id as
          | ServiceIdentifier
          | undefined) ?? targetConstructor;
      serviceMetadata.factory =
        (optionsOrServiceIdentifier as ServiceMetadata).factory ?? undefined;
      serviceMetadata.multiple =
        (optionsOrServiceIdentifier as ServiceMetadata).multiple || false;
      serviceMetadata.global =
        (optionsOrServiceIdentifier as ServiceMetadata).global || false;
      serviceMetadata.eager =
        (optionsOrServiceIdentifier as ServiceMetadata).eager ?? false;
      serviceMetadata.transient =
        (optionsOrServiceIdentifier as ServiceMetadata).transient || false;
    }

    Container.set(serviceMetadata);
  };
}
