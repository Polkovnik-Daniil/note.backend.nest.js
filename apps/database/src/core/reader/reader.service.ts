import { Reader } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ReaderRepository } from './reader.repository';
import {
  ReaderCreateEventDto,
  ReaderUpdateEventDto,
} from '@database-validation/reader';
import { ReaderOrNull, ReadersOrNull } from '@validation-core/types/reader';

@Injectable()
export class ReaderService {
  constructor(private readonly repository: ReaderRepository) {}
  async create(createEventDto: ReaderCreateEventDto): Promise<ReaderOrNull> {
    try {
      return await this.repository.create(createEventDto);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getReaderById(id: string): Promise<ReaderOrNull> {
    try {
      const reader: Reader = await this.repository.getReaderById(id);
      return reader;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async update(
    id: string,
    updateEventDto: ReaderUpdateEventDto,
  ): Promise<ReaderOrNull> {
    try {
      //Check is exists reader
      const reader: Reader = await this.repository.getReaderById(id);
      if (!reader) {
        throw new Error(`The reader does not exist with this id - ${id}!`); //todo: Изменить название ошибки
      }
      return await this.repository.update(id, updateEventDto);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async delete(id: string): Promise<ReaderOrNull> {
    try {
      //Check is exists reader
      const reader: Reader = await this.repository.getReaderById(id);
      if (!reader) {
        throw new Error(`The reader already deleted!`); //todo: Изменить название ошибки
      }
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
