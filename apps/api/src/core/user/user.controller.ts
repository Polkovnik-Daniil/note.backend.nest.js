import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { UserUpdateDto } from 'apps/database/src/validation/user';
import { UserOrNull } from 'apps/database/src/validation/types/user';
import { ClientKafka } from '@nestjs/microservices';
import { NameServices } from '@local-types/name.services.enum';
import { RoutesEntities } from '@local-types/routes.entities';

@ApiTags(RoutesEntities.USERS)
@Controller(RoutesEntities.USERS)
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(
    private readonly service: UserService,
    @Inject(NameServices.EMAIL) private client: ClientKafka,
  ) {}

  @Get('get-one/:id')
  @CacheTTL(6000)
  @CacheKey('user')
  @ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserOrNull> {
    return await this.service.getUser(id);
  }

  @Get('update-one/:id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UserUpdateDto,
  ): Promise<UserOrNull> {
    return await this.service.updateUser(id, updateDto);
  }
}
