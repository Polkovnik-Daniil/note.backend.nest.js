import { Module } from '@nestjs/common';
import { APIModule } from '@database-core/api';
import { UserModule } from '@database-core/user';
import { NoteModule } from '@database-core/note';
import { PrismaModule } from '@database-core/prisma';

@Module({
  imports: [PrismaModule, APIModule, UserModule, NoteModule],
})
export class DatabaseModule {}
