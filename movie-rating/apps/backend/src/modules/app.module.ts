import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Neo4jConfigModule } from '../infrastructure/database/neo4j.config';
import { UserModule } from './user.modules';
import { MovieModule } from './movie.module';
import { RatingModule } from './rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        endpoint: '/graphql',
        settings: {
          'request.credentials': 'include',
        },
      },
      introspection: true,
    }),
    Neo4jConfigModule,
    UserModule,
    MovieModule,
    RatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
