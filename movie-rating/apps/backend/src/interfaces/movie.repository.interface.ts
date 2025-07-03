import { Movie } from "../infrastructure/entities/movie.entity";

export interface MovieRepositoryInterface {
  create(movie: Movie): Promise<Movie>;
  findAll(): Promise<Movie[]>;
  findById(id: string): Promise<Movie>;
  updateById(id: string, movie: Movie): Promise<Movie>;
  deleteById(id: string): Promise<void>;
  findByGenre(genre: string): Promise<Movie[]>;
  getAverageRating(movieId: string): Promise<number>;
}
