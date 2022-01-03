/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module, NonEmptyArray } from '@tessellation/core';

import { GraphqlLoader } from './graphql.loader';
import { GraphqlProvider } from './graphql.provider';

@Module({
  providers: [GraphqlProvider],
  loaders: [GraphqlLoader],
})
export class GraphqlModule {
  static withConfig(config: {
    resolvers: NonEmptyArray<CallableFunction>;
  }): CallableFunction {
    if (config.resolvers.length === 0) {
      throw new Error('Needs at least one resolver');
    }

    return GraphqlModule;
  }
}
