import { StringOrDate } from '@local-types/core/type.string.or.date';
import { Prisma, Role } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  first_name: string;
  second_name: string;
  email: string;
  hash_passsword: string;
  active: boolean;
  role?: Role;
  createdAt?: StringOrDate;
  updatedAt?: StringOrDate;
}
