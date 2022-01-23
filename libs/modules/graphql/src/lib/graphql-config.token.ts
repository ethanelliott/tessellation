/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from '@tessellation/core';

import { GraphqlConfig } from './graphql-config';

export const GRAPHQL_CONFIG_TOKEN = new Token<GraphqlConfig>('graphql-config');
