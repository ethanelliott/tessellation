/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container, Token } from 'typedi';

export const GRAPHQL_RESOLVER_TOKEN = new Token<Array<CallableFunction>>(
  'graphql-resolvers',
);
Container.set(GRAPHQL_RESOLVER_TOKEN, []);
