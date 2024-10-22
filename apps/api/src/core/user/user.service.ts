import { User } from '@prisma/client';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEndpointList } from '@local-types/user';
import {
  UserCreateDto,
  UserUpdateDto,
} from 'apps/database/src/validation/user';
import { NameServices } from '@validation-core/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  async createUser(data: UserCreateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const isCreated: boolean = await firstValueFrom(
        this.client.send(`${UserEndpointList.CREATE_USER}`, data),
      );
      return isCreated;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getUser(id: string): Promise<User> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const user: User = await firstValueFrom(
        this.client.send(`${UserEndpointList.GET_USER}`, id),
      );
      return user;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      data.id = id;
      const isUpdated: boolean = await firstValueFrom(
        this.client.send(`${UserEndpointList.UPDATE_USER}`, data),
      );
      return isUpdated;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const isDeleted: boolean = await firstValueFrom(
        this.client.send(`${UserEndpointList.DELETE_USER}`, id),
      );
      return isDeleted;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
