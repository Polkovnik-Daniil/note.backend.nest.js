import { Controller } from '@nestjs/common';

import { BookGenreService } from './book.genre.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { BookGenre } from './book.genre.entity';

@Controller('book.genres')
export class BookGenreController extends CommonCrudController(BookGenre) {
  constructor(private readonly service: BookGenreService) {
    super(service);
  }
}
