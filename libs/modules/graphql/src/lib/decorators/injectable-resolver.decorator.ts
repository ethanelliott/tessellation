/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container, Service } from '@tessellation/core';
import { ClassType, Resolver } from 'type-graphql';
import {
  AbstractClassOptions,
  ClassTypeResolver,
} from 'type-graphql/dist/decorators/types';

import { GRAPHQL_RESOLVER_TOKEN } from '../graphql-resolver.token';

declare function OptionalResolver(
  optionsOrTypeFunction?: AbstractClassOptions | ClassType | ClassTypeResolver,
  options?: AbstractClassOptions,
): ClassDecorator;

/**
 * @param {...any} _arguments
 */
export function InjectableResolver(
  ..._arguments: Parameters<typeof OptionalResolver>
) {
  return (target: CallableFunction): void => {
    Service()(target);
    const a = _arguments as unknown as Parameters<typeof Resolver>;

    Resolver(...a)(target);

    const resolverArray = Container.get(
      GRAPHQL_RESOLVER_TOKEN,
    ) as Array<CallableFunction>;

    resolverArray.push(target);

    Container.set(GRAPHQL_RESOLVER_TOKEN, resolverArray);
  };
}
