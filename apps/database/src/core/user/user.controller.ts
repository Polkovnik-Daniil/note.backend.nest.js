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

  @MessagePattern(UserEndpointList.CREATE_USER)
  async handlerCreateUser(
    createEventDto: UserCreateEventDto,
  ): Promise<boolean> {
    const user: User = await this.databaseService.create(createEventDto);
    return isObjectNotNull(user);
  }

  @MessagePattern(UserEndpointList.GET_USER)
  async handlerGetUser(id: string): Promise<User> {
    const user: User = await this.databaseService.getUserById(id);
    return user;
  }

  @MessagePattern(UserEndpointList.UPDATE_USER)
  async handlerUpdateUser(
    updateEventDto: UserUpdateEventDto,
  ): Promise<boolean> {
    const user: User = await this.databaseService.update(
      updateEventDto.id,
      updateEventDto,
    );
    return isObjectNotNull(user);
  }

  @MessagePattern(UserEndpointList.DELETE_USER)
  async handlerDeleteUser(id: string): Promise<boolean> {
    const user: User = await this.databaseService.delete(id);
    return isObjectNotNull(user);
  }
}
