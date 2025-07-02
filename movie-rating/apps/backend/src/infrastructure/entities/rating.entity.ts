import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";
import { Movie } from "./movie.entity";

@ObjectType()
export class Rating {
  @Field(() => Int)
  score: number;

  @Field(() => String, { nullable: true })
  review?: string;

  @Field(() => User)
  user: User;

  @Field(() => Movie)
  movie: Movie;
}