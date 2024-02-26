import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookGenre } from './book.genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookGenre])],
})
export class BookGenreModule {}
