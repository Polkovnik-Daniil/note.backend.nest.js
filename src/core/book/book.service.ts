import { Injectable, Logger } from '@nestjs/common';

import { Book } from './book.entity';
import { CommonCrudService } from 'src/common/services/common.crud.service';

@Injectable()
export class BookService extends CommonCrudService(Book) {
  constructor() {
    super();
  }
}
