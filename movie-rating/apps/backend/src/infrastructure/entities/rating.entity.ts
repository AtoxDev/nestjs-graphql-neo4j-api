import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Rating {
  @Field(() => ID)
  id: string;

  @Field(() => Number)
  score: number;

  @Field(() => String, { nullable: true })
  review?: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  movieId: string;
}


