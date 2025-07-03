import { HttpStatus, Injectable, Inject } from "@nestjs/common";
import { User } from "../../infrastructure/entities/user.entity";
import { CreateUserInput, UpdateUserInput } from "../../web/inputType/user-input.entity";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { ErrorHandler } from "../handlers/error.handler";

@Injectable()
export class UserUseCases {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository
  ) {}

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const user: User = {
        id: Date.now().toString(),
        name: input.name,
        email: input.email,
      };
      return await this.userRepository.create(user);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_CREATE_ERROR');
      throw error;
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_FIND_ALL_ERROR');
      throw error;
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_FIND_BY_ID_ERROR');
      throw error;
    }
  }

  async updateUserById(id: string, input: UpdateUserInput): Promise<User> {
    try {
      const user: User = {
        id,
        name: input.name,
        email: input.email,
      };
      return await this.userRepository.updateById(id, user);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_UPDATE_BY_ID_ERROR');
      throw error;
    }
  }

  async deleteUserById(id: string): Promise<void> {
    try {
      await this.userRepository.deleteById(id);
    } catch (error: any) {
      ErrorHandler.handleErrorGeneral(error.message, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_DELETE_ERROR');
      throw error;
    }
  }
}
