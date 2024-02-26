import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAuthor } from './book.author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookAuthor])],
})
export class BookAuthorModule {}
