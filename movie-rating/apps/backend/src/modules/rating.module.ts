import { Module } from "@nestjs/common";
import { RatingResolver } from "../web/resolvers/rating.resolver";
import { RatingUseCases } from "../core/use-cases/rating.use-cases";
import { RatingRepository } from "../infrastructure/repositories/rating.repository";

@Module({
  providers: [
    RatingResolver,
    RatingUseCases,
    {
      provide: 'RatingRepository',
      useClass: RatingRepository,
    },
  ],
  exports: [RatingUseCases, 'RatingRepository'],
})
export class RatingModule {}
