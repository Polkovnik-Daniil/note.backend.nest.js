import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserCreateEventDto, UserUpdateEventDto } from '@validation-core/user';
import { UserEndpointList } from '@validation-core/types';
import { User } from '@prisma/client';
import { isObjectNotNull } from '@database-helpers/common';

@Controller()
export class UserController {
  constructor(private readonly databaseService: UserService) {}

  @MessagePattern(UserEndpointList.GET_USER)
  async handlerGetUser(id: string) {
    const user: User = await this.databaseService.getUser(id);
    return user;
  }

  @MessagePattern(UserEndpointList.CREATE_USER)
  async handlerCreateUser(userCreateEventDto: UserCreateEventDto) {
    const user: User =
      await this.databaseService.createUser(userCreateEventDto);
    return isObjectNotNull(user);
  }

  @MessagePattern(UserEndpointList.UPDATE_USER)
  async handlerUpdateUser(userUpdateEventDto: UserUpdateEventDto) {
    const user: User = await this.databaseService.updateUser(
      userUpdateEventDto.id,
      userUpdateEventDto,
    );
    return isObjectNotNull(user);
  }

  @MessagePattern(UserEndpointList.DELETE_USER)
  async handlerDeleteUser(id: string) {
    const user: User = await this.databaseService.deleteUser(id);
    return isObjectNotNull(user);
  }
}
