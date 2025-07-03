import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@movie-rating/backend/modules/app.module';

describe('Backend API Tests', () => {
  let app: INestApplication;
  let baseURL: string;
  let createdUserId: string;
  let createdRatingId: string;

  beforeAll(async () => {
    // Configurar variables de entorno para Neo4j
    process.env.NEO4J_URI = 'bolt://localhost:7687';
    process.env.NEO4J_USERNAME = 'neo4j';
    process.env.NEO4J_PASSWORD = 'test1234';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Obtener la URL base del servidor
    const server = app.getHttpServer();
    const address = server.address();
    if (typeof address === 'string') {
      baseURL = address;
    } else {
      baseURL = `http://localhost:${address?.port || 3000}`;
    }
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Tests', () => {
    it('should create a new user', async () => {
      const mutation = `
        mutation RegisterUser($input: CreateUserInput!) {
          registerUser(input: $input) {
            id
            name
            email
          }
        }
      `;

      const variables = {
        input: {
          name: 'testuser',
          email: 'test@example.com'
        }
      };

      const res = await axios.post(`${baseURL}/graphql`, {
        query: mutation,
        variables
      });

      expect(res.status).toBe(200);
      expect(res.data.data.registerUser).toHaveProperty('id');
      expect(res.data.data.registerUser.name).toBe('testuser');
      expect(res.data.data.registerUser.email).toBe('test@example.com');

      // Guardar el id para los siguientes tests
      createdUserId = res.data.data.registerUser.id;
    });

    it('should get user by id', async () => {
      const query = `
        query GetUser($id: String!) {
          user(id: $id) {
            id
            name
            email
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query,
        variables: { id: createdUserId }
      });

      expect(res.status).toBe(200);
      expect(res.data.data.user).toBeDefined();
      expect(res.data.data.user).toHaveProperty('id');
      expect(res.data.data.user).toHaveProperty('name');
      expect(res.data.data.user).toHaveProperty('email');
      expect(res.data.data.user.id).toBe(createdUserId);
    });

    it('should get all users', async () => {
      const query = `
        query {
          users {
            id
            name
            email
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query
      });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.data.data.users)).toBe(true);
      expect(res.data.data.users.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Movie Tests', () => {
    it('should get movie by id', async () => {
      const query = `
        query GetMovie($id: String!) {
          movie(id: $id) {
            id
            title
            releaseYear
            genres
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query,
        variables: { id: '1' }
      });

      expect(res.status).toBe(200);
      expect(res.data.data.movie).toBeDefined();
      expect(res.data.data.movie).toHaveProperty('id');
      expect(res.data.data.movie).toHaveProperty('title');
      expect(res.data.data.movie).toHaveProperty('releaseYear');
      expect(res.data.data.movie).toHaveProperty('genres');
    });

    it('should get all movies', async () => {
      const query = `
        query {
          movies {
            id
            title
            releaseYear
            genres
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query
      });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.data.data.movies)).toBe(true);
      expect(res.data.data.movies.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Rating Tests', () => {
    it('should create a new rating', async () => {
      const mutation = `
        mutation RateMovie($userId: String!, $movieId: String!, $score: Float!, $review: String) {
          rateMovie(userId: $userId, movieId: $movieId, score: $score, review: $review) {
            id
            score
            review
            userId
            movieId
          }
        }
      `;

      const variables = {
        userId: '1',
        movieId: '1',
        score: 5.0,
        review: 'Great movie!'
      };

      const res = await axios.post(`${baseURL}/graphql`, {
        query: mutation,
        variables
      });

      expect(res.status).toBe(200);
      expect(res.data.data.rateMovie).toHaveProperty('id');
      expect(res.data.data.rateMovie.score).toBe(5);
      expect(res.data.data.rateMovie.review).toBe('Great movie!');
      expect(res.data.data.rateMovie.userId).toBe('1');
      expect(res.data.data.rateMovie.movieId).toBe('1');

      // Guardar el id para los siguientes tests
      createdRatingId = res.data.data.rateMovie.id;
    });

    it('should get rating by id', async () => {
      const query = `
        query GetRating($id: String!) {
          rating(id: $id) {
            id
            score
            review
            userId
            movieId
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query,
        variables: { id: createdRatingId }
      });

      expect(res.status).toBe(200);
      expect(res.data.data.rating).toBeDefined();
      expect(res.data.data.rating).toHaveProperty('id');
      expect(res.data.data.rating).toHaveProperty('score');
      expect(res.data.data.rating).toHaveProperty('userId');
      expect(res.data.data.rating).toHaveProperty('movieId');
      expect(res.data.data.rating.id).toBe(createdRatingId);
    });

    it('should get all ratings', async () => {
      const query = `
        query {
          ratings {
            id
            score
            review
            userId
            movieId
          }
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query
      });

      expect(res.status).toBe(200);
      expect(Array.isArray(res.data.data.ratings)).toBe(true);
      expect(res.data.data.ratings.length).toBeGreaterThanOrEqual(0);
    });

    it('should get average rating for movie', async () => {
      const query = `
        query GetAverageRating($movieId: String!) {
          averageRatingForMovie(movieId: $movieId)
        }
      `;

      const res = await axios.post(`${baseURL}/graphql`, {
        query,
        variables: { movieId: '1' }
      });

      expect(res.status).toBe(200);
      expect(typeof res.data.data.averageRatingForMovie).toBe('number');
      expect(res.data.data.averageRatingForMovie).toBeGreaterThanOrEqual(0);
    });
  });
});
