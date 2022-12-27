/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { InjectableResolver } from '@tessellation/graphql';
import { Query } from 'type-graphql';

import { User } from '../models/user.model';

@InjectableResolver()
export class UserResolver {
  @Query(() => [ User ])
  users(): Array<User> {
    return [];
  }
}
