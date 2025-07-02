import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../../infrastructure/entities/user.entity";
import { UserUseCases } from "../../core/use-cases/user.use-cases";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Mutation(() => User)
  async createUser(@Args('user') user: User): Promise<User> {
    return this.userUseCases.createUser(user);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userUseCases.findAllUsers();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.userUseCases.findUserById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('user') user: User): Promise<User> {
    return this.userUseCases.updateUserById(id, user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    await this.userUseCases.deleteUserById(id);
    return true;
  }
}