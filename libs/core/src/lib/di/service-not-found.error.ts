/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ServiceIdentifier } from './service-identifier';
import { Token } from './token';

export class ServiceNotFoundError extends Error {
  name = 'ServiceNotFoundError';

  private readonly _normalizedIdentifier: string = '<UNKNOWN_IDENTIFIER>';

  get message(): string {
    return `Service with "${this._normalizedIdentifier}" identifier was not found in the container. Register it before usage by explicitly calling "Container.set" or using the "@Service()" decorator.`;
  }

  constructor(identifier: ServiceIdentifier | undefined) {
    super();

    if (typeof identifier === 'string') {
      this._normalizedIdentifier = identifier;
    } else if (identifier instanceof Token) {
      this._normalizedIdentifier = `Token<${identifier.name ?? 'UNSET_NAME'}>`;
    } else if (identifier && (identifier.name || identifier.prototype?.name)) {
      this._normalizedIdentifier =
        `MaybeConstructable<${identifier.name}>` ||
        `MaybeConstructable<${
          (identifier.prototype as { name: string }).name
        }>`;
    }
  }
}
