import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { UserEndpointList, UserOrNull } from '@validation-core/types/user';
import { ClientKafka } from '@nestjs/microservices';
import { NameServices } from '@local-types/name.services.enum';
import { RoutesEntities } from '@local-types/routes.entities';

@ApiTags(RoutesEntities.USERS)
@Controller(RoutesEntities.USERS)
@UseInterceptors(CacheInterceptor)
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: UserService,
    @Inject(NameServices.DATABASE) private readonly databaseClient: ClientKafka,
  ) {}

  onModuleDestroy() {
    this.databaseClient.close();
  }

  onModuleInit() {
    this.databaseClient.subscribeToResponseOf(
      UserEndpointList.CREATE_USER, // + '.*',
    );
    this.databaseClient.subscribeToResponseOf(
      UserEndpointList.GET_USER, //+ '.*'
    );
    this.databaseClient.subscribeToResponseOf(
      UserEndpointList.UPDATE_USER, // + '.*',
    );
    this.databaseClient.subscribeToResponseOf(
      UserEndpointList.DELETE_USER, // + '.*',
    );
    this.databaseClient.connect();
  }

  @Post('create-one')
  @CacheTTL(6000)
  @CacheKey('create-user')
  async createUser(@Body() createDto: UserCreateDto): Promise<UserOrNull> {
    return await this.service.createUser(createDto);
  }

  @Get('get-one/:id')
  @CacheTTL(6000)
  @CacheKey('get-user')
  //@ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserOrNull> {
    return await this.service.getUser(id);
  }

  @Put('update-one/:id')
  @Patch('update-one/:id')
  @CacheTTL(6000)
  @CacheKey('update-user')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UserUpdateDto,
  ): Promise<UserOrNull> {
    return await this.service.updateUser(id, updateDto);
  }

  @Delete('delete-one/:id')
  @CacheTTL(6000)
  @CacheKey('delete-user')
  async deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserOrNull> {
    console.log('d');
    return await this.service.deleteUser(id);
  }
}
