import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserOrNull } from '@local-types/user';
import { RoutesEntities } from 'src/constants/routes.entities';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserUpdateDto } from '@validations/user';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags(RoutesEntities.USERS)
@Controller(RoutesEntities.USERS)
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}
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
