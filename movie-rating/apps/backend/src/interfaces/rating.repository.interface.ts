import { Rating } from "../infrastructure/entities/rating.entity";

export interface RatingRepositoryInterface {
  createRating(userId: string, movieId: string, score: number, review?: string): Promise<Rating>;
  getRatingsByUser(userId: string): Promise<Rating[]>;
  getRatingsForMovie(movieId: string): Promise<Rating[]>;
  getAverageRatingForMovie(movieId: string): Promise<number>;
}
