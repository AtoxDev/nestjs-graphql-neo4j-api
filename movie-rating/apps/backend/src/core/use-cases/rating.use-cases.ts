import { HttpStatus, Injectable, Inject } from "@nestjs/common";
import { Rating } from "../../infrastructure/entities/rating.entity";
import { ErrorHandler } from "../handlers/error.handler";
import { RatingRepository } from "../../infrastructure/repositories/rating.repository";

@Injectable()
export class RatingUseCases {
  constructor(
    @Inject('RatingRepository') private readonly ratingRepository: RatingRepository
  ) {}

  async createRating(input: { userId: string; movieId: string; score: number; comment?: string }): Promise<Rating> {
    try {
      return await this.ratingRepository.createRating(
        input.userId,
        input.movieId,
        input.score,
        input.comment
      );
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_CREATE_ERROR');
      throw error;
    }
  }

  async findRatingById(id: string): Promise<Rating> {
    try {
      return await this.ratingRepository.findRatingById(id);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_FIND_BY_ID_ERROR');
      throw error;
    }
  }

  async findAllRatings(): Promise<Rating[]> {
    try {
      return await this.ratingRepository.findAllRatings();
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_FIND_ALL_ERROR');
      throw error;
    }
  }

  async getRatingsByUser(userId: string): Promise<Rating[]> {
    try {
      return await this.ratingRepository.getRatingsByUser(userId);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_FIND_BY_USER_ERROR');
      throw error;
    }
  }

  async getRatingsByMovie(movieId: string): Promise<Rating[]> {
    try {
      return await this.ratingRepository.getRatingsForMovie(movieId);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_FIND_BY_MOVIE_ERROR');
      throw error;
    }
  }

  async getAverageRatingByMovie(movieId: string): Promise<number> {
    try {
      return await this.ratingRepository.getAverageRatingForMovie(movieId);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'RATING_AVERAGE_BY_MOVIE_ERROR');
      throw error;
    }
  }
}
