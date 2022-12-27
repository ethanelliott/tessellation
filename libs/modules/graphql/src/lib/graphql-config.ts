/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { BuildSchemaOptions } from 'type-graphql';

export interface GraphqlConfig {
  path: string;
  buildSchemaOptions: Omit<BuildSchemaOptions, 'resolvers'>;
}
