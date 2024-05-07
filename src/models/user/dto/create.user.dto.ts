import { EGgender } from '../enum.gender';
import { Role } from '@models/role';

export class CreateUserDto {
  email: string;
  hashPassword: string;
  nameFirst: string;
  nameLast: string;
  birthDat: Date;
  gender: EGgender;
  isLocked: boolean;
  role: Role;
  editDate: Date;
}

