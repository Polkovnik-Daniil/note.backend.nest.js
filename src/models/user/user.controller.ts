import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { User } from './user.entity';

@Controller('users')
export class UserController extends CommonCrudController(User) {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
