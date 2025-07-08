import { Inject, Injectable } from "@nestjs/common";
import { Driver } from "neo4j-driver";
import { Movie } from "../entities/movie.entity";
import { MovieRepositoryInterface } from "../../interfaces/movie.repository.interface";

@Injectable()
export class MovieRepository implements MovieRepositoryInterface {
  constructor(
    @Inject('NEO4J_DRIVER') private readonly driver: Driver,
  ) {}

  async create(movie: Movie): Promise<Movie> {
    const session = this.driver.session();
    const result = await session.run(
      'CREATE (m:Movie {id: $id, title: $title, releaseYear: $releaseYear, genres: $genres}) RETURN m',
      {
        id: movie.id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        genres: movie.genres
      }
    );
    await session.close();
    const properties = result.records[0].get('m').properties;
    return {
      ...properties,
      releaseYear: properties.releaseYear ? Number(properties.releaseYear) : null
    };
  }

  async findAll(): Promise<Movie[]> {
    const session = this.driver.session();
    const result = await session.run('MATCH (m:Movie) RETURN m');
    await session.close();
    return result.records.map(record => {
      const properties = record.get('m').properties;
      return {
        ...properties,
        releaseYear: properties.releaseYear ? Number(properties.releaseYear) : null
      };
    });
  }

  async findById(id: string): Promise<Movie> {
    const session = this.driver.session();
    const result = await session.run('MATCH (m:Movie {id: $id}) RETURN m', { id });
    await session.close();
    const properties = result.records[0]?.get('m').properties;
    if (properties) {
      return {
        ...properties,
        releaseYear: properties.releaseYear ? Number(properties.releaseYear) : null
      };
    }
    return properties;
  }

  async updateById(id: string, movie: Movie): Promise<Movie> {
    const session = this.driver.session();
    const result = await session.run(
      'MATCH (m:Movie {id: $id}) SET m.title = $title, m.releaseYear = $releaseYear, m.genres = $genres RETURN m',
      {
        id,
        title: movie.title,
        releaseYear: movie.releaseYear,
        genres: movie.genres
      }
    );
    await session.close();
    const properties = result.records[0].get('m').properties;
    return {
      ...properties,
      releaseYear: properties.releaseYear ? Number(properties.releaseYear) : null
    };
  }

  async deleteById(id: string): Promise<void> {
    const session = this.driver.session();
    await session.run('MATCH (m:Movie {id: $id}) DETACH DELETE m', { id });
    await session.close();
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    const session = this.driver.session();
    const result = await session.run(
      'MATCH (m:Movie) WHERE $genre IN m.genres RETURN m',
      { genre }
    );
    await session.close();
    return result.records.map(record => {
      const properties = record.get('m').properties;
      return {
        ...properties,
        releaseYear: properties.releaseYear ? Number(properties.releaseYear) : null
      };
    });
  }

  async getAverageRating(movieId: string): Promise<number> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (m:Movie {id: $movieId})-[:HAS_RATING]->(r:Rating)
       RETURN AVG(r.score) as averageRating`,
      { movieId }
    );
    await session.close();
    const averageRating = result.records[0]?.get('averageRating');
    return averageRating ? Math.round(averageRating * 100) / 100 : 0;
  }
}
