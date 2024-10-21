import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UserCreateEventDto, UserUpdateEventDto } from '@validation-core/user';
import { UserEndpointList } from '@validation-core/types';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly databaseService: UserService) {}

  //@EventPattern(UserEndpointList.GET_USER)
  @MessagePattern(UserEndpointList.GET_USER)
  async handlerGetUser(id: string) {
    const user: User = await this.databaseService.getUser(id);
    console.log(user);
    return user;
  }

  @EventPattern(UserEndpointList.CREATE_USER)
  async handlerCreateUser(userCreateEventDto: UserCreateEventDto) {
    return await this.databaseService.createUser(userCreateEventDto);
  }

  @EventPattern(UserEndpointList.UPDATE_USER)
  handlerUpdateUser(userUpdateEventDto: UserUpdateEventDto) {
    return this.databaseService.updateUser(
      userUpdateEventDto.id,
      userUpdateEventDto,
    );
  }

  @EventPattern(UserEndpointList.DELETE_USER)
  handlerDeleteUser(id: string) {
    return this.databaseService.deleteUser(id);
  }
}
