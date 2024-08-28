import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserOrNull } from '@local-types/core';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserOrNull> {
    return await this.service.getUser(id);
  }
//   @Post('/')
//   async createUser(@Body() user: CreateUserDto): Promise<UserOrNull> {
//     return await this.service.createUser({ user });
//   }
}
