/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container } from '@tessellation/core';
import { Entity } from 'typeorm';

import { DATABASE_ENTITY_TOKEN } from '../database-entity.token';

/**
 * @param {...any} arguments_
 */
export function InjectableEntity(...arguments_: Parameters<typeof Entity>) {
  return (target: unknown): void => {
    Entity(...arguments_)(target as never);
    const entityArray = Container.get(DATABASE_ENTITY_TOKEN);

    entityArray.push(target as never);

    Container.set(DATABASE_ENTITY_TOKEN, entityArray);
  };
}
