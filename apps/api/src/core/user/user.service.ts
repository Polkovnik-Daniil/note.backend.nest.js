import { Prisma, User } from '@prisma/client';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEndpointList, UserOrNull, UsersOrNull } from '@local-types/user';
import {
  UserCreateDto,
  UserUpdateDto,
} from 'apps/database/src/validation/user';
import { NameServices } from '@validation-core/types';
import * as hash from 'object-hash';

@Injectable()
export class UserService {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  async createUser(data: UserCreateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      let userReturned: User;
      const hashObj: string = hash(
        { data },
        {
          algorithm: 'sha512',
          encoding: 'base64',
        },
      ).substring(0, 25);
      this.client
        .send(`${UserEndpointList.CREATE_USER}.${hashObj}`, data)
        .subscribe((user: User) => {
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getUser(id: string): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const hashObj: string = hash(
        { id },
        {
          algorithm: 'sha512',
          encoding: 'base64',
        },
      ).substring(0, 25);
      console.log(hashObj);
      let userReturned: User;
      this.client
        .send(`${UserEndpointList.GET_USER}.${id}.${hashObj}`, id)
        .subscribe((user: User) => {
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      data.id = id;
      const hashObj: string = hash(
        { id },
        {
          algorithm: 'sha512',
          encoding: 'base64',
        },
      ).substring(0, 25);
      let userReturned: User;
      this.client
        .send(`${UserEndpointList.GET_USER}.${id}.${hashObj}`, data)
        .subscribe((user: User) => {
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async deleteUser(id: string): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const hashObj: string = hash(
        { id },
        {
          algorithm: 'sha512',
          encoding: 'base64',
        },
      ).substring(0, 25);
      let userReturned: User;
      this.client
        .send(`${UserEndpointList.DELETE_USER}.${id}.${hashObj}`, id)
        .subscribe((user: User) => {
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
