import { PrismaService } from '@db/prisma.service';
import { UserOrNull } from '@local-types/core/user/type.user.or.null';
import { UsersOrNull } from '@local-types/core/user/type.users.or.null';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  //todo: add new method (updateMany, createMany etc. getPage, getList)
  constructor(private prisma: PrismaService) {}
  async createUser(params: {
    data: Prisma.UserCreateInput;
  }): Promise<UserOrNull> {
    const { data } = params;
    return await this.prisma.user.create({ data });
  }
  async createUsers(params: {
    data: Prisma.UserCreateInput[];
  }): Promise<number> {
    const { data } = params;
    return (await this.prisma.user.createMany({ data })).count;
  }
  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UsersOrNull> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
  }
  async getUserById(id: string): Promise<UserOrNull> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async getUserByEmail(email: string): Promise<UserOrNull> {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  async updateUser(params: {
    id: string;
    data: Prisma.UserCreateInput;
  }): Promise<UserOrNull> {
    const { id, data } = params;
    return await this.prisma.user.upsert({
      where: { id },
      update: data,
      create: data,
    });
  }
  async deleteUser(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
