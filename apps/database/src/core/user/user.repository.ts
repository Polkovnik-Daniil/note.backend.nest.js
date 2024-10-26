import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database-core/prisma';
import { UserOrNull } from '@database-validation/types/user';
import { UserCreateDto, UserUpdateDto } from '@database-validation/user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createDto: UserCreateDto): Promise<UserOrNull> {
    return this.prisma.user.create({ data: createDto });
  }

  async getUserById(id: string): Promise<UserOrNull> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<UserOrNull> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateDto: UserUpdateDto): Promise<UserOrNull> {
    return this.prisma.user.update({
      where: { id },
      data: updateDto,
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
