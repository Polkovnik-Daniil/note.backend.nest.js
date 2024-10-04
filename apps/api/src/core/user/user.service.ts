import { Prisma, User } from '@prisma/client';

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEndpointList, UserOrNull, UsersOrNull } from '@local-types/user';
import {
  UserCreateDto,
  UserUpdateDto,
} from 'apps/database/src/validation/user';
import { NameServices } from '@validation-core/types';

@Injectable()
export class UserService {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  async createUser(data: UserCreateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      return null;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getUser(id: string): Promise<UserOrNull> {
    this.client
      .send(`${UserEndpointList.CREATE_USER}.${id}-`, id) //todo: add hash 
      .subscribe((user: User) => {
        console.log(user);
      });
    return null;
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UsersOrNull> {
    const { skip, take, cursor, where, orderBy } = params;
    return null;
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      return null;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async deleteUser(id: string): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      //this.client.send().subscribe();
      return null;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
