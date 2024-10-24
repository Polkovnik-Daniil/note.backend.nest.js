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
  async createNote(data: NoteCreateEventDto): Promise<NoteOrNull> {
    try {
      return await this.repository.createNote(data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getNote(id: string): Promise<NoteOrNull> {
    try {
      const note: Note = await this.repository.getNoteById(id);
      return note;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateNote(id: string, data: NoteUpdateEventDto): Promise<NoteOrNull> {
    try {
      //Check is exists note
      const note: Note = await this.repository.getNoteById(id);
      if (!note) {
        throw new Error(`The note does not exist with this id - ${id}!`); //todo: Изменить название ошибки
      }
      return await this.repository.updateNote(id, data);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteNote(id: string): Promise<NoteOrNull> {
    try {
      //Check is exists note
      const note: Note = await this.repository.getNoteById(id);
      if (!note) {
        throw new Error(`The note already deleted!`); //todo: Изменить название ошибки
      }
      return await this.repository.deleteNote(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
