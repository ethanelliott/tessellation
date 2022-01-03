/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { DatabaseConfig } from './database-config';

export const DATABASE_CONFIG_TOKEN = new Token<DatabaseConfig>(
  'database-config',
);
