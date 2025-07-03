import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Int, { nullable: true })
  releaseYear?: number;

  @Field(() => [String])
  genres: string[];
}

