/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ServiceIdentifier } from './service-identifier';
import { Token } from './token';

export class CannotInstantiateValueError extends Error {
  name = 'CannotInstantiateValueError';

  private readonly _normalizedIdentifier: string = '<UNKNOWN_IDENTIFIER>';

  get message(): string {
    return `Cannot instantiate the requested value for the "${this._normalizedIdentifier}" identifier.
The related metadata doesn't contain a factory or a type to instantiate.`;
  }

  constructor(identifier: ServiceIdentifier) {
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
