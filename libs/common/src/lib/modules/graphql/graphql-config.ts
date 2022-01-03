/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { BuildSchemaOptions } from 'type-graphql';

export interface GraphqlConfig {
  // resolvers: NonEmptyArray<CallableFunction>;
  path: string;
  buildSchemaOptions: Omit<BuildSchemaOptions, 'resolvers'>;
}
