import { PrismaService } from '@database-core/prisma';
import { UserCreateDto, UserUpdateDto } from 'apps/database/src/validation/user';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserOrNull, UsersOrNull } from 'apps/database/src/validation/types/user';


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
