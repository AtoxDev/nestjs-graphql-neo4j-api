import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Rating } from "./rating.entity";

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

  @Field(() => [Rating], { nullable: 'itemsAndList' })
  ratings?: Rating[];
}