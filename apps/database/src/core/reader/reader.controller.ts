import { Reader } from '@prisma/client';
import { Controller } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { MessagePattern } from '@nestjs/microservices';
import { ReaderEndpointList } from '@database-validation/types/reader';
import { isObjectNotNull } from '@database-helpers/common';
import {
  ReaderCreateEventDto,
  ReaderUpdateEventDto,
} from '@validation-core/reader';

@Controller()
export class ReaderController {
  constructor(private readonly databaseService: ReaderService) {}

  @MessagePattern(ReaderEndpointList.CREATE_READER)
  async handlerCreateReader(createEventDto: ReaderCreateEventDto) {
    const reader: Reader = await this.databaseService.create(createEventDto);
    return isObjectNotNull(reader);
  }

  @MessagePattern(ReaderEndpointList.GET_READER)
  async handlerGetReader(id: string) {
    const reader: Reader = await this.databaseService.getReaderById(id);
    return reader;
  }

  @MessagePattern(ReaderEndpointList.UPDATE_READER)
  async handlerUpdateNote(updateEventDto: ReaderUpdateEventDto) {
    const reader: Reader = await this.databaseService.update(
      updateEventDto.id,
      updateEventDto,
    );
    return isObjectNotNull(reader);
  }

  @MessagePattern(ReaderEndpointList.DELETE_READER)
  async handlerDeleteNote(id: string) {
    const reader: Reader = await this.databaseService.delete(id);
    return isObjectNotNull(reader);
  }
}
