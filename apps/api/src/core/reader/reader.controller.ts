import { ApiTags } from '@nestjs/swagger';
import { ReaderService } from './reader.service';
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
import { ReaderCreateDto, ReaderUpdateDto } from '@database-validation/reader';
import {
  ReaderEndpointList,
  ReaderOrNull,
} from '@validation-core/types/reader';
import { ClientKafka } from '@nestjs/microservices';
import { NameServices } from '@local-types/name.services.enum';
import { RoutesEntities } from '@local-types/routes.entities';
import { Reader } from '@prisma/client';

@ApiTags(RoutesEntities.READERS)
@Controller(RoutesEntities.READERS)
@UseInterceptors(CacheInterceptor)
export class ReaderController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: ReaderService,
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(
      ReaderEndpointList.CREATE_READER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      ReaderEndpointList.GET_READER, //+ '.*'
    );
    this.client.subscribeToResponseOf(
      ReaderEndpointList.UPDATE_READER, // + '.*',
    );
    this.client.subscribeToResponseOf(
      ReaderEndpointList.DELETE_READER, // + '.*',
    );
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  @Post('create-one')
  @CacheTTL(6000)
  @CacheKey('create-reader')
  async create(@Body() createDto: ReaderCreateDto): Promise<boolean> {
    const isCreated: boolean = await this.service.create(createDto);
    return isCreated;
  }

  @Get('get-one/:id')
  @CacheTTL(6000)
  @CacheKey('get-reader')
  //@ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  async getReaderById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReaderOrNull> {
    const reader: Reader = await this.service.getReaderById(id);
    return reader;
  }

  @Put('update-one/:id')
  @Patch('update-one/:id')
  @CacheTTL(6000)
  @CacheKey('update-reader')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: ReaderUpdateDto,
  ): Promise<boolean> {
    const isUpdated: boolean = await this.service.update(id, updateDto);
    return isUpdated;
  }

  @Delete('delete-one/:id')
  //@CacheTTL(6000)
  //@CacheKey('delete-note')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    const isDeleted: boolean = await this.service.delete(id);
    return isDeleted;
  }
}
