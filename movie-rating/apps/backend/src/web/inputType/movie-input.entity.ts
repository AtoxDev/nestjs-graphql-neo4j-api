import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  genre: string;

  @Field(() => Int)
  releaseYear: number;
}

@InputType()
export class UpdateMovieInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  genre?: string;

  @Field(() => Int, { nullable: true })
  releaseYear?: number;
}
