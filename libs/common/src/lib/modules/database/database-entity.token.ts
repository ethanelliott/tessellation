/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container, Token } from 'typedi';
import { EntitySchema } from 'typeorm';

export const DATABASE_ENTITY_TOKEN = new Token<
  Array<Constructable<CallableFunction>> | Array<EntitySchema>
>('database-entities');
Container.set(DATABASE_ENTITY_TOKEN, []);
