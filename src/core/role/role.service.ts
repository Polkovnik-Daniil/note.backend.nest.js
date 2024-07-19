import { Injectable, Logger } from '@nestjs/common';

import { Role } from './role.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class RoleService extends CommonCrudService(Role) {
  constructor() {
    super();
  }
}
