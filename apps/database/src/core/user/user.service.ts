import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma, User } from '@prisma/client';
import {
  UserCreateEventDto,
  UserUpdateEventDto,
} from 'apps/database/src/validation/user';
import { UserOrNull, UsersOrNull } from '@validation-core/types';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  async createUser(data: UserCreateEventDto): Promise<UserOrNull> {
    try {
      //Check is exists user
      const user: User = await this.repository.getUserByEmail(data.email);
      if (user) {
        throw new Error(
          `A user with such an email ${user.email} already exists!`,
        );
      }
      return await this.repository.createUser(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getUser(id: string): Promise<UserOrNull> {
    return await this.repository.getUserById(id);
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UsersOrNull> {
    const { skip, take, cursor, where, orderBy } = params;
    await this.repository.getUsers(skip, take, cursor, where, orderBy);
    return;
  }

  async updateUser(id: string, data: UserUpdateEventDto): Promise<UserOrNull> {
    try {
      //Check is exists user
      const user: User = await this.repository.getUserById(id);
      if (!user) {
        throw new Error(`The user does not exist with this id - ${id}!`);
      }
      return await this.repository.updateUser(id, data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteUser(id: string): Promise<UserOrNull> {
    try {
      //Check is exists user
      const user: User = await this.repository.getUserById(id);
      if (!user) {
        throw new Error(`The user already deleted!`);
      }
      return await this.repository.deleteUser(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
