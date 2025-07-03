import { Inject, Injectable } from "@nestjs/common";
import { Driver } from "neo4j-driver";
import { Rating } from "../entities/rating.entity";
import { RatingRepositoryInterface } from "../../interfaces/rating.repository.interface";

@Injectable()
export class RatingRepository implements RatingRepositoryInterface {
  constructor(
    @Inject('NEO4J_DRIVER') private readonly driver: Driver,
  ) {}

  async createRating(userId: string, movieId: string, score: number, review?: string): Promise<Rating> {
    const session = this.driver.session();
    const ratingId = Date.now().toString();
    const result = await session.run(
      `MATCH (u:User {id: $userId})
       MATCH (m:Movie {id: $movieId})
       CREATE (r:Rating {id: $ratingId, score: $score, review: $review})
       CREATE (u)-[:RATED]->(r)
       CREATE (r)-[:RATES]->(m)
       RETURN r, u, m`,
      { userId, movieId, ratingId, score, review }
    );
    await session.close();

    const record = result.records[0];
    return {
      id: record.get('r').properties.id,
      score: record.get('r').properties.score,
      review: record.get('r').properties.review,
      user: record.get('u').properties,
      movie: record.get('m').properties,
    };
  }

  async getRatingsByUser(userId: string): Promise<Rating[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (u:User {id: $userId})-[:RATED]->(r:Rating)-[:RATES]->(m:Movie)
       RETURN r, u, m`,
      { userId }
    );
    await session.close();

    return result.records.map(record => ({
      id: record.get('r').properties.id,
      score: record.get('r').properties.score,
      review: record.get('r').properties.review,
      user: record.get('u').properties,
      movie: record.get('m').properties,
    }));
  }

  async getRatingsForMovie(movieId: string): Promise<Rating[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (u:User)-[:RATED]->(r:Rating)-[:RATES]->(m:Movie {id: $movieId})
       RETURN r, u, m`,
      { movieId }
    );
    await session.close();

    return result.records.map(record => ({
      id: record.get('r').properties.id,
      score: record.get('r').properties.score,
      review: record.get('r').properties.review,
      user: record.get('u').properties,
      movie: record.get('m').properties,
    }));
  }

  async getAverageRatingForMovie(movieId: string): Promise<number> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (u:User)-[:RATED]->(r:Rating)-[:RATES]->(m:Movie {id: $movieId})
       RETURN avg(r.score) as average`,
      { movieId }
    );
    await session.close();

    const average = result.records[0].get('average');
    return average ? Math.round(average * 10) / 10 : 0;
  }
}
