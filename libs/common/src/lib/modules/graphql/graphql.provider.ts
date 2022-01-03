/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  APP_CONFIG_TOKEN_SYMBOL,
  AppConfig,
  FrameworkProvider,
  GenericAppConfig,
} from '@tessellation/core';

import { GraphqlConfig } from './graphql-config';
import { GRAPHQL_CONFIG_TOKEN } from './graphql-config.token';

export const GraphqlProvider: FrameworkProvider<GraphqlConfig> = {
  provide: GRAPHQL_CONFIG_TOKEN,
  deps: [APP_CONFIG_TOKEN_SYMBOL],
  useValue: <T extends GenericAppConfig>(
    appConfig: AppConfig<T>,
  ): GraphqlConfig =>
    <GraphqlConfig>{
      path: appConfig.get('graphql.path', false) ?? 'graphql',
      buildSchemaOptions:
        appConfig.get('graphql.buildSchemaOptions', false) ?? {},
    },
};
