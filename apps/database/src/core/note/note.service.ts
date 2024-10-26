import { Note } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { NoteRepository } from './note.repository';
import {
  NoteCreateEventDto,
  NoteUpdateEventDto,
} from '@database-validation/note';
import { NoteOrNull } from '@validation-core/types/note';

@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}
  async create(createEventDto: NoteCreateEventDto): Promise<NoteOrNull> {
    try {
      return await this.repository.create(createEventDto);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getNoteById(id: string): Promise<NoteOrNull> {
    try {
      const note: Note = await this.repository.getNoteById(id);
      return note;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async update(
    id: string,
    updateEventDto: NoteUpdateEventDto,
  ): Promise<NoteOrNull> {
    try {
      //Check is exists note
      const note: Note = await this.repository.getNoteById(id);
      if (!note) {
        throw new Error(`The note does not exist with this id - ${id}!`); //todo: Изменить название ошибки
      }
      return await this.repository.update(id, updateEventDto);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async delete(id: string): Promise<NoteOrNull> {
    try {
      //Check is exists note
      const note: Note = await this.repository.getNoteById(id);
      if (!note) {
        throw new Error(`The note already deleted!`); //todo: Изменить название ошибки
      }
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
