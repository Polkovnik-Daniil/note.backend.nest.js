import { Controller } from '@nestjs/common';

import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';

@Controller('roles')
export class RoleController extends CommonCrudController(Role) {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }
}
