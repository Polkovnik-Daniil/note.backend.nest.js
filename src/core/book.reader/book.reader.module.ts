import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReader } from './book.reader.entity';
import { BookReaderService } from './book.reader.service';
import { BookReaderController } from './book.reader.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookReader])],
  controllers: [BookReaderController],
  providers: [BookReaderService]
})
export class BookReaderModule {}
