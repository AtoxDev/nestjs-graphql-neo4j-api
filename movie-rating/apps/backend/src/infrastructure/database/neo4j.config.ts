import { Global, Module } from "@nestjs/common";
import neo4j from "neo4j-driver";

@Global()
@Module({
  imports: [],
  providers: [{
    provide: 'NEO4J_DRIVER',
    useFactory: () => {
      return neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'test1234')
      );
    },
  }],
  exports: ['NEO4J_DRIVER'],
})
export class Neo4jConfigModule {}