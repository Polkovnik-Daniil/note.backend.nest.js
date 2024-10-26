import { Note } from '@prisma/client';
import { Controller } from '@nestjs/common';
import { NoteService } from './note.service';
import { MessagePattern } from '@nestjs/microservices';
import { isObjectNotNull } from '@database-helpers/common';
import { NoteEndpointList } from '@database-validation/types/note';
import { NoteCreateEventDto, NoteUpdateEventDto } from '@validation-core/note';

@Controller()
export class NoteController {
  constructor(private readonly databaseService: NoteService) {}

  @MessagePattern(NoteEndpointList.CREATE_NOTE)
  async handlerCreateNote(
    createEventDto: NoteCreateEventDto,
  ): Promise<boolean> {
    const note: Note = await this.databaseService.create(createEventDto);
    return isObjectNotNull(note);
  }

  @MessagePattern(NoteEndpointList.GET_NOTE)
  async handlerGetNote(id: string): Promise<Note> {
    const note: Note = await this.databaseService.getNoteById(id);
    return note;
  }

  @MessagePattern(NoteEndpointList.UPDATE_NOTE)
  async handlerUpdateNote(
    updateEventDto: NoteUpdateEventDto,
  ): Promise<boolean> {
    const note: Note = await this.databaseService.update(
      updateEventDto.id,
      updateEventDto,
    );
    return isObjectNotNull(note);
  }

  @MessagePattern(NoteEndpointList.DELETE_NOTE)
  async handlerDeleteNote(id: string): Promise<boolean> {
    const note: Note = await this.databaseService.delete(id);
    return isObjectNotNull(note);
  }
}
