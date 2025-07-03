import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../../infrastructure/entities/user.entity";
import { CreateUserInput, UpdateUserInput } from "../inputType/user-input.entity";
import { UserUseCases } from "../../core/use-cases/user.use-cases";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userUseCases.createUser(input);
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
  async updateUser(@Args('id') id: string, @Args('input') input: UpdateUserInput): Promise<User> {
    return this.userUseCases.updateUserById(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    await this.userUseCases.deleteUserById(id);
    return true;
  }
}
