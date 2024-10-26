import { Note } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { NoteEndpointList } from '@local-types/note';
import { NoteCreateDto, NoteUpdateDto } from '@database-validation/note';
import { NameServices } from '@validation-core/types';

@Injectable()
export class NoteService {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  async create(data: NoteCreateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const isCreated: boolean = await firstValueFrom(
        this.client.send(`${NoteEndpointList.CREATE_NOTE}`, data),
      );
      return isCreated;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getNoteById(id: string): Promise<Note> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const note: Note = await firstValueFrom(
        this.client.send(`${NoteEndpointList.GET_NOTE}`, id),
      );
      return note;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async update(id: string, data: NoteUpdateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      data.id = id;
      const isUpdated: boolean = await firstValueFrom(
        this.client.send(`${NoteEndpointList.UPDATE_NOTE}`, data),
      );
      return isUpdated;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async delete(id: string): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const isDeleted: boolean = await firstValueFrom(
        this.client.send(`${NoteEndpointList.DELETE_NOTE}`, id),
      );
      return isDeleted;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
