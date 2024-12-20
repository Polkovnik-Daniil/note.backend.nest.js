import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  UserCreateDto,
  UserUpdateDto,
} from 'apps/database/src/validation/user';
import { User } from '@prisma/client';
import { ClientKafka } from '@nestjs/microservices';
import { RoutesEntities, NameServices } from '@validation-core/types';
import { UserEndpointList, UserOrNull } from '@validation-core/types/user';

@ApiTags(RoutesEntities.USERS)
@Controller(RoutesEntities.USERS)
@UseInterceptors(CacheInterceptor)
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: UserService,
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(
      UserEndpointList.CREATE_USER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.GET_USER, //+ '.*'
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.UPDATE_USER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      UserEndpointList.DELETE_USER, // + '.*',
    );
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  @Post('create-one')
  @CacheTTL(6000)
  @CacheKey('create-user')
  async create(@Body() createDto: UserCreateDto): Promise<boolean> {
    const isCreated: boolean = await this.service.create(createDto);
    return isCreated;
  }

  @Get('get-one/:id')
  @CacheTTL(6000)
  @CacheKey('get-user')
  //@ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserOrNull> {
    const user: User = await this.service.getUserById(id);
    return user;
  }

  @Put('update-one/:id')
  @Patch('update-one/:id')
  @CacheTTL(6000)
  @CacheKey('update-user')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UserUpdateDto,
  ): Promise<boolean> {
    const isUpdated: boolean = await this.service.update(id, updateDto);
    return isUpdated;
  }

  @Delete('delete-one/:id')
  //@CacheTTL(6000)
  //@CacheKey('delete-user')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const isDeleted: boolean = await this.service.delete(id);
    return isDeleted;
  }
}
