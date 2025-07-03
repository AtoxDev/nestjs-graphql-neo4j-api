import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rating } from "../../infrastructure/entities/rating.entity";
import { RatingUseCases } from "../../core/use-cases/rating.use-cases";

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingUseCases: RatingUseCases) {}

  @Mutation(() => Rating)
  async rateMovie(
    @Args('userId') userId: string,
    @Args('movieId') movieId: string,
    @Args('score') score: number,
    @Args('review', { nullable: true }) review?: string
  ): Promise<Rating> {
    return this.ratingUseCases.createRating({ userId, movieId, score, comment: review });
  }

  @Query(() => [Rating])
  async ratingsByUser(@Args('userId') userId: string): Promise<Rating[]> {
    return this.ratingUseCases.getRatingsByUser(userId);
  }

  @Query(() => [Rating])
  async ratingsForMovie(@Args('movieId') movieId: string): Promise<Rating[]> {
    return this.ratingUseCases.getRatingsByMovie(movieId);
  }

  @Query(() => Number)
  async averageRatingForMovie(@Args('movieId') movieId: string): Promise<number> {
    return this.ratingUseCases.getAverageRatingByMovie(movieId);
  }
}
