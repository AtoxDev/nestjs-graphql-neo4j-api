import { Inject, Injectable } from "@nestjs/common";
import { Driver } from "neo4j-driver";
import { IUserRepository } from "../../interfaces/user.repository.interface";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('NEO4J_DRIVER') private readonly driver: Driver,
  ) {}

  async create(user: User): Promise<User> {
    const session = this.driver.session();
    const result = await session.run(
      'CREATE (u:User {id: $id, name: $name, email: $email}) RETURN u',
      { id: user.id, name: user.name, email: user.email }
    );
    await session.close();
    return result.records[0].get('u').properties;
  }

  async findAll(): Promise<User[]> {
    const session = this.driver.session();
    const result = await session.run('MATCH (u:User) RETURN u');
    await session.close();
    return result.records.map(record => record.get('u').properties);
  }

  async findById(id: string): Promise<User> {
    const session = this.driver.session();
    const result = await session.run('MATCH (u:User {id: $id}) RETURN u', { id });
    await session.close();
    return result.records[0].get('u').properties;
  }

  async updateById(id: string, user: User): Promise<User> {
    const session = this.driver.session();
    const result = await session.run(
      'MATCH (u:User {id: $id}) SET u.name = $name, u.email = $email RETURN u',
      { id: user.id, name: user.name, email: user.email }
    );
    await session.close();
    return result.records[0].get('u').properties;
  }

  async deleteById(id: string): Promise<void> {
    const session = this.driver.session();
    await session.run('MATCH (u:User {id: $id}) DELETE u', { id });
    await session.close();
  }
}
