import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookAuthor } from './book.author.entity';
import { BookAuthorController } from './book.author.controller';
import { BookAuthorService } from './book.author.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookAuthor])],
  controllers: [BookAuthorController],
  providers: [BookAuthorService], 
})
export class BookAuthorModule {}
