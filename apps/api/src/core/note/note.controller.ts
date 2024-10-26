import { ApiTags } from '@nestjs/swagger';
import { NoteService } from './note.service';
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
import { NoteCreateDto, NoteUpdateDto } from '@database-validation/note';
import { NoteEndpointList, NoteOrNull } from '@validation-core/types/note';
import { ClientKafka } from '@nestjs/microservices';
import { NameServices } from '@local-types/name.services.enum';
import { RoutesEntities } from '@local-types/routes.entities';
import { Note } from '@prisma/client';

@ApiTags(RoutesEntities.NOTES)
@Controller(RoutesEntities.NOTES)
@UseInterceptors(CacheInterceptor)
export class NoteController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: NoteService,
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(
      NoteEndpointList.CREATE_NOTE, // + '.*',
    );
    this.client.subscribeToResponseOf(
      NoteEndpointList.GET_NOTE, //+ '.*'
    );
    this.client.subscribeToResponseOf(
      NoteEndpointList.UPDATE_NOTE, // + '.*',
    );
    this.client.subscribeToResponseOf(
      NoteEndpointList.DELETE_NOTE, // + '.*',
    );
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  @Post('create-one')
  @CacheTTL(6000)
  @CacheKey('create-note')
  async create(@Body() createDto: NoteCreateDto): Promise<boolean> {
    const isCreated: boolean = await this.service.create(createDto);
    return isCreated;
  }

  @Get('get-one/:id')
  @CacheTTL(6000)
  @CacheKey('get-note')
  //@ApiBearerAuth('jwt')
  //@UseGuards(JwtAuthGuard)
  async getNoteById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<NoteOrNull> {
    const note: Note = await this.service.getNoteById(id);
    return note;
  }

  @Put('update-one/:id')
  @Patch('update-one/:id')
  @CacheTTL(6000)
  @CacheKey('update-note')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: NoteUpdateDto,
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
