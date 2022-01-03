/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { DatabaseType } from 'typeorm';

export interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
