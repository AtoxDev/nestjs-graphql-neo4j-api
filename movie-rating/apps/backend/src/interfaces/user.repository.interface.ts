import { User } from "../infrastructure/entities/user.entity";


export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(user: User): Promise<User>;
  updateById(id: string, user: User): Promise<User>;
  deleteById(id: string): Promise<void>;
}