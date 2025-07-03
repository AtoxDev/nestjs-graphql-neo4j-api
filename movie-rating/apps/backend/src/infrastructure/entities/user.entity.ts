import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Rating } from './rating.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [Rating], { nullable: true })
  ratings?: Rating[];
}