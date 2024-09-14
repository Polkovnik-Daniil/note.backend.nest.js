import { Prisma, User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { UserOrNull, UsersOrNull } from '@local-types/user';
import { UserUpdateDto, UserCreateDto } from '@validations/user';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlreadyExistsException } from '@exceptions/already-exists.exception';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}
  async createUser(data: UserCreateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      //Check is exists user
      const user: User = await this.repository.getUserByEmail(data.email);
      if (user) {
        throw new AlreadyExistsException(
          `A user with such an email ${user.email} already exists!`,
        );
      }
      return this.repository.createUser(data);
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
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
    return await this.repository.getUsers(skip, take, cursor, where, orderBy);
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    //Check is exists user
    try {
      const user: User = await this.repository.getUserById(id);
      if (!user) {
        throw new AlreadyExistsException(
          `The user does not exist with this id - ${id}!`,
        );
      }
      return this.repository.updateUser(id, data);
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async deleteUser(id: string): Promise<UserOrNull> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      //Check is exists user
      const user: User = await this.repository.getUserById(id);
      if (!user) {
        throw new AlreadyExistsException(`The user already deleted!`);
      }
      return this.repository.deleteUser(id);
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
