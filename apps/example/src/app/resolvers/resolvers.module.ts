/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

 import { Module } from '@tessellation/core';
import { GraphqlModule } from '@tessellation/graphql';

import { User } from '../models/user.model';
import { UserResolver } from './user.resolver';

 @Module({
   modules: [
     GraphqlModule.withConfig({
      resolvers: [UserResolver],
      entities: [User],
     }),
   ],
 })
 export class ResolversModule {}
