import { Reader } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database-core/prisma';
import { ReaderOrNull } from '@database-validation/types/reader';
import { ReaderCreateDto, ReaderUpdateDto } from '@database-validation/reader';

@Injectable()
export class ReaderRepository {
  constructor(private prisma: PrismaService) {}

  async create(createDto: ReaderCreateDto): Promise<ReaderOrNull> {
    return this.prisma.reader.create({
      data: createDto,
    });
  }

  async getReaderById(id: string): Promise<ReaderOrNull> {
    return this.prisma.reader.findUnique({
      where: { id },
      include: { User: true }, //todo: Есть ли необходимость использовать include?
    });
  }

  async update(id: string, updateDto: ReaderUpdateDto): Promise<ReaderOrNull> {
    return this.prisma.reader.update({
      where: { id },
      data: updateDto,
    });
  }

  async delete(id: string): Promise<Reader> {
    return this.prisma.reader.delete({ where: { id } });
  }
}
