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
    @Args('score', { type: () => Number }) score: number,
    @Args('review', { nullable: true }) review?: string
  ): Promise<Rating> {
    return this.ratingUseCases.createRating({ userId, movieId, score, comment: review });
  }

  @Query(() => Rating)
  async rating(@Args('id') id: string): Promise<Rating> {
    return this.ratingUseCases.findRatingById(id);
  }

  @Query(() => [Rating])
  async ratings(): Promise<Rating[]> {
    return this.ratingUseCases.findAllRatings();
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
