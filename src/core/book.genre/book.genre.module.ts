import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookGenre } from './book.genre.entity';
import { BookGenreController } from './book.genre.controller';
import { BookGenreService } from './book.genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookGenre])],
  controllers: [BookGenreController],
  providers: [BookGenreService],
})
export class BookGenreModule {}
