import { Module } from "@nestjs/common";
import { UserResolver } from "../web/resolvers/user.resolver";
import { UserUseCases } from "../core/use-cases/user.use-cases";
import { UserRepository } from "../infrastructure/repositories/user.repository";

@Module({
  providers: [
    UserResolver,
    UserUseCases,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserUseCases, 'UserRepository'],
})
export class UserModule {}
