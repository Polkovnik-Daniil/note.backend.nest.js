import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern } from '@nestjs/microservices';
import { UserCreateEventDto, UserUpdateEventDto } from '@validation-core/user';
import { UserEndpointList } from '@validation-core/types';
import { Kafka } from 'kafkajs';

@Controller()
export class UserController {
  constructor(private readonly databaseService: UserService) {}

  @EventPattern(UserEndpointList.GET_USER + '.*')
  handlerGetUser(id: string) {
    return this.databaseService.getUser(id);
  }

  @EventPattern(UserEndpointList.CREATE_USER + '.*')
  handlerCreateUser(userCreateEventDto: UserCreateEventDto) {
    return this.databaseService.createUser(userCreateEventDto);
  }

  @EventPattern(UserEndpointList.UPDATE_USER + '.*')
  handlerUpdateUser(userUpdateEventDto: UserUpdateEventDto) {
    return this.databaseService.updateUser(
      userUpdateEventDto.id,
      userUpdateEventDto,
    );
  }

  @EventPattern(UserEndpointList.DELETE_USER + '.*')
  handlerDeleteUser(id: string) {
    return this.databaseService.deleteUser(id);
  }
}
