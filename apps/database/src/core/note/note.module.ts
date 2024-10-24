import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteRepository } from './note.repository';
import { NoteController } from './note.controller';
import { PrismaModule } from '@database-core/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
})
export class NoteModule {}
