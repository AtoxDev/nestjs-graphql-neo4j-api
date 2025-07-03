import { Global, Module } from "@nestjs/common";
import neo4j from "neo4j-driver";

@Global()
@Module({
  imports: [],
  providers: [{
    provide: 'NEO4J_DRIVER',
    useFactory: () => {
      const uri = process.env.NEO4J_URI || 'bolt://localhost:7687';
      const username = process.env.NEO4J_USERNAME || 'neo4j';
      const password = process.env.NEO4J_PASSWORD || 'test1234';

      return neo4j.driver(
        uri,
        neo4j.auth.basic(username, password)
      );
    },
  }],
  exports: ['NEO4J_DRIVER'],
})
export class Neo4jConfigModule {}
