import { Injectable, Logger } from '@nestjs/common';

import { BookReader } from './book.reader.entity';
import { CommonCrudService } from 'src/common/services/common.crud.service';

@Injectable()
export class BookReaderService extends CommonCrudService(BookReader) {
  constructor() {
    super();
  }
}
