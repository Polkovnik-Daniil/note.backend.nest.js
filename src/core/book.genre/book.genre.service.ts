import { Injectable, Logger } from '@nestjs/common';

import { BookGenre } from './book.genre.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class BookGenreService extends CommonCrudService(BookGenre) {
  constructor() {
    super();
  }
}
