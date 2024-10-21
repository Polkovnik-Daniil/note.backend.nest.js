import { Prisma, User } from '@prisma/client';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserEndpointList, UserOrNull, UsersOrNull } from '@local-types/user';
import {
  UserCreateDto,
  UserUpdateDto,
} from 'apps/database/src/validation/user';
import { NameServices } from '@validation-core/types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(
      UserEndpointList.CREATE_USER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.GET_USER, //+ '.*'
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.UPDATE_USER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.DELETE_USER, // + '.*',
    );
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  async createUser(data: UserCreateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      let userReturned: User;
      this.client
        .send(`${UserEndpointList.CREATE_USER}`, data)
        .subscribe((user: User) => {
          console.log(user);
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getUser(id: string): Promise<any> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const user: any = await firstValueFrom(
        this.client.send(`${UserEndpointList.GET_USER}`, id),
      );
      return user;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      data.id = id;
      let userReturned: User;
      await this.client
        .send(`${UserEndpointList.GET_USER}`, data)
        .subscribe((user: User) => {
          console.log(user);
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
      let userReturned: User;
      await this.client
        .send(`${UserEndpointList.DELETE_USER}`, id)
        .subscribe((user: User) => {
          console.log(user);
          userReturned = user;
        });
      return userReturned;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
