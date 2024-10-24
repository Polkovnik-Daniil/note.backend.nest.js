import { forwardRef, Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { DatabaseModule } from '@api-core/database/database.module';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
