import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReader } from './book.reader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookReader])],
})
export class BookReaderModule {}
