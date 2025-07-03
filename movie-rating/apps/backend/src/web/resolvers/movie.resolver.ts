import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Movie } from "../../infrastructure/entities/movie.entity";
import { CreateMovieInput } from "../inputType/movie-input.entity";
import { MovieUseCases } from "../../core/use-cases/movie.use-cases";

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieUseCases: MovieUseCases) {}

  @Mutation(() => Movie)
  async addMovie(@Args('input') input: CreateMovieInput): Promise<Movie> {
    return this.movieUseCases.createMovie(input);
  }

  @Query(() => [Movie])
  async movies(): Promise<Movie[]> {
    return this.movieUseCases.findAllMovies();
  }

  @Query(() => Movie)
  async movie(@Args('id') id: string): Promise<Movie> {
    return this.movieUseCases.findMovieById(id);
  }
}
