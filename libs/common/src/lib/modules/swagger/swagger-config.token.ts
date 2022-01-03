/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { SwaggerConfig } from './swagger-config';

export const SWAGGER_CONFIG_TOKEN = new Token<SwaggerConfig>('swagger-config');
