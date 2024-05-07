import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class UserService extends CommonCrudService(User) {
  constructor() {
    super();
  }
}
