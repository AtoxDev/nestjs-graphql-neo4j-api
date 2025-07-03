import { Module } from "@nestjs/common";
import { RatingResolver } from "../web/resolvers/rating.resolver";
import { RatingUseCases } from "../core/use-cases/rating.use-cases";
import { RatingRepository } from "../infrastructure/repositories/rating.repository";
import { Neo4jConfigModule } from "../infrastructure/database/neo4j.config";

@Module({
  imports: [Neo4jConfigModule],
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
