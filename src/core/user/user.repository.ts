import { PrismaService } from '@db/prisma.service';
import { IdOrEmail, UserOrNull } from '@local-types/user';
import { UsersOrNull } from '@local-types/user';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import UserCreateDto from '@validations/user/user.create.dto';
import UserUpdateDto from '@validations/user/user.update.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: UserCreateDto): Promise<UserOrNull> {
    return this.prisma.user.create({ data });
  }

  async getUsers(
    skip?: number,
    take?: number,
    cursor?: Prisma.UserWhereUniqueInput,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput,
  ): Promise<UsersOrNull> {
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }
  
  async getUserById(id: string): Promise<UserOrNull> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<UserOrNull> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: string, updateDto: UserUpdateDto): Promise<UserOrNull> {
    return this.prisma.user.update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
