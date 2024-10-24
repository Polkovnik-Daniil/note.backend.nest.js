import { Note } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database-core/prisma';
import { NoteOrNull } from '@database-validation/types/note';
import { NoteCreateDto, NoteUpdateDto } from '@database-validation/note';

@Injectable()
export class NoteRepository {
  constructor(private prisma: PrismaService) {}

  async createNote(data: NoteCreateDto): Promise<NoteOrNull> {
    return this.prisma.note.create({ data });
  }

  async getNoteById(id: string): Promise<NoteOrNull> {
    return this.prisma.note.findUnique({ where: { id } });
  }

  async updateNote(id: string, updateDto: NoteUpdateDto): Promise<NoteOrNull> {
    return this.prisma.note.update({
      where: { id },
      data: updateDto,
    });
  }

  async deleteNote(id: string): Promise<Note> {
    return this.prisma.note.delete({ where: { id } });
  }
}
