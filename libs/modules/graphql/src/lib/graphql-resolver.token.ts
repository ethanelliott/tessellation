/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container, NonEmptyArray, Token } from '@tessellation/core';

export const GRAPHQL_RESOLVER_TOKEN = new Token<
  NonEmptyArray<CallableFunction>
>('graphql-resolvers');
Container.set(GRAPHQL_RESOLVER_TOKEN, []);
