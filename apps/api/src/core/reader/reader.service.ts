import { Reader } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { ReaderEndpointList } from '@local-types/reader';
import { NameServices } from '@validation-core/types';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ReaderCreateDto, ReaderUpdateDto } from '@database-validation/reader';

@Injectable()
export class ReaderService {
  constructor(
    @Inject(NameServices.DATABASE) private readonly client: ClientKafka,
  ) {}

  async create(createDto: ReaderCreateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const isCreated: boolean = await firstValueFrom(
        this.client.send(`${ReaderEndpointList.CREATE_READER}`, createDto),
      );
      return isCreated;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async getReaderById(id: string): Promise<Reader> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      const reader: Reader = await firstValueFrom(
        this.client.send(`${ReaderEndpointList.GET_READER}`, id),
      );
      return reader;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }

  async update(id: string, data: ReaderUpdateDto): Promise<boolean> {
    let statusCode = HttpStatus.CONFLICT;
    try {
      data.id = id;
      const isUpdated: boolean = await firstValueFrom(
        this.client.send(`${ReaderEndpointList.UPDATE_READER}`, data),
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
        this.client.send(`${ReaderEndpointList.DELETE_READER}`, id),
      );
      return isDeleted;
    } catch (error) {
      throw new HttpException((error as Error).message, statusCode);
    }
  }
}
