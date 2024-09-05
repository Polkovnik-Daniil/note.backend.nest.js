import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Prisma } from '@prisma/client';
import { UserOrNull, UsersOrNull, IdOrEmail } from '@local-types/user';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async createUser(params: {
    data: Prisma.UserCreateInput;
  }): Promise<UserOrNull> {
    const { email } = params.data;
    const isExistsUser = await this.isExistsUser({ email });
    if (!isExistsUser) {
      throw new Error('A user with such an email already exists!');
    }
    return this.repository.createUser(params);
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
    return await this.repository.getUsers(params);
  }
  async updateUser(params: {
    id: string;
    data: Prisma.UserCreateInput;
  }): Promise<UserOrNull> {
    const { id } = params;
    const isExistsUser = await this.isExistsUser({ id });
    if (!isExistsUser) {
      throw new Error('The user does not exist with this id!');
    }
    return this.repository.updateUser(params);
  }
  //todo: add new type isExistsUser
  async isExistsUser(params: IdOrEmail): Promise<boolean> {
    const { id, email } = params;
    let user: UserOrNull = null;
    if (!id) {
      user = await this.repository.getUserByEmail(email);
    }
    if (!email) {
      user = await this.repository.getUserById(id);
    }
    return user != null ? true : false;
  }
}
