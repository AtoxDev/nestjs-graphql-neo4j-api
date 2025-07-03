import { HttpStatus, Injectable, Inject } from "@nestjs/common";
import { Movie } from "../../infrastructure/entities/movie.entity";
import { CreateMovieInput, UpdateMovieInput } from "../../web/inputType/movie-input.entity";
import { MovieRepository } from "../../infrastructure/repositories/movie.repository";
import { ErrorHandler } from "../handlers/error.handler";

@Injectable()
export class MovieUseCases {
  constructor(
    @Inject('MovieRepository') private readonly movieRepository: MovieRepository
  ) {}

  async createMovie(input: CreateMovieInput): Promise<Movie> {
    try {
      const movie: Movie = {
        id: Date.now().toString(),
        title: input.title,
        genres: [input.genre],
        releaseYear: input.releaseYear,
      };
      return await this.movieRepository.create(movie);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_CREATE_ERROR');
      throw error;
    }
  }

  async findAllMovies(): Promise<Movie[]> {
    try {
      return await this.movieRepository.findAll();
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_FIND_ALL_ERROR');
      throw error;
    }
  }

  async findMovieById(id: string): Promise<Movie> {
    try {
      return await this.movieRepository.findById(id);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_FIND_BY_ID_ERROR');
      throw error;
    }
  }

  async updateMovieById(id: string, input: UpdateMovieInput): Promise<Movie> {
    try {
      const movie: Movie = {
        id,
        title: input.title,
        genres: [input.genre],
        releaseYear: input.releaseYear,
      };
      return await this.movieRepository.updateById(id, movie);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_UPDATE_BY_ID_ERROR');
      throw error;
    }
  }

  async deleteMovieById(id: string): Promise<void> {
    try {
      await this.movieRepository.deleteById(id);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_DELETE_ERROR');
      throw error;
    }
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    try {
      return await this.movieRepository.findByGenre(genre);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_FIND_BY_GENRE_ERROR');
      throw error;
    }
  }

  async getAverageRating(movieId: string): Promise<number> {
    try {
      return await this.movieRepository.getAverageRating(movieId);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'MOVIE_AVERAGE_RATING_ERROR');
      throw error;
    }
  }
}
