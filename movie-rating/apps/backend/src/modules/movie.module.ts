import { Module } from "@nestjs/common";
import { MovieResolver } from "../web/resolvers/movie.resolver";
import { MovieUseCases } from "../core/use-cases/movie.use-cases";
import { MovieRepository } from "../infrastructure/repositories/movie.repository";

@Module({
  providers: [
    MovieResolver,
    MovieUseCases,
    {
      provide: 'MovieRepository',
      useClass: MovieRepository,
    },
  ],
  exports: [MovieUseCases, 'MovieRepository'],
})
export class MovieModule {}
