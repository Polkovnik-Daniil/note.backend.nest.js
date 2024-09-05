import { $Enums, Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  id?: string;
  first_name: string;
  surname_name: string;
  email: string;
  hash_passsword: string;
  isActivated: boolean;
  isEmailVerified: boolean;
  role?: $Enums.Role;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  Note?: Prisma.NoteCreateNestedManyWithoutUserInput;
  Label?: Prisma.LabelCreateNestedManyWithoutUserInput;
  Reader?: Prisma.ReaderCreateNestedManyWithoutUserInput;
  Editor?: Prisma.EditorCreateNestedManyWithoutUserInput;
}
