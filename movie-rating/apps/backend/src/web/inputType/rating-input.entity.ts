import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRatingInput {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  movieId: string;

  @Field(() => Int)
  score: number;

  @Field(() => String, { nullable: true })
  comment?: string;
}

@InputType()
export class UpdateRatingInput {
  @Field(() => Int, { nullable: true })
  score?: number;

  @Field(() => String, { nullable: true })
  comment?: string;
}
