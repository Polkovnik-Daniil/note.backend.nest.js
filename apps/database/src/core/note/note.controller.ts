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

  @MessagePattern(NoteEndpointList.GET_NOTE)
  async handlerGetNote(id: string) {
    const note: Note = await this.databaseService.getNote(id);
    return note;
  }

  @MessagePattern(NoteEndpointList.CREATE_NOTE)
  async handlerCreateNote(noteCreateEventDto: NoteCreateEventDto) {
    const note: Note =
      await this.databaseService.createNote(noteCreateEventDto);
    return isObjectNotNull(note);
  }

  @MessagePattern(NoteEndpointList.UPDATE_NOTE)
  async handlerUpdateNote(noteUpdateEventDto: NoteUpdateEventDto) {
    const note: Note = await this.databaseService.updateNote(
      noteUpdateEventDto.id,
      noteUpdateEventDto,
    );
    return isObjectNotNull(note);
  }

  @MessagePattern(NoteEndpointList.DELETE_NOTE)
  async handlerDeleteNote(id: string) {
    const note: Note = await this.databaseService.deleteNote(id);
    return isObjectNotNull(note);
  }
}
