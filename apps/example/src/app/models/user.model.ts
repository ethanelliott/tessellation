/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Field, ObjectType } from 'type-graphql';

@ObjectType({
  description: 'A user',
})
export class User {
  @Field({ description: 'The ID of user' })
  id: string;

  @Field({ description: 'The name of the user' })
  name: string;
}
