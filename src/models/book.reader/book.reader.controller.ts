import { Controller } from '@nestjs/common';

import { BookReaderService } from './book.reader.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { BookReader } from './book.reader.entity';

@Controller('book.reader')
export class BookReaderController extends CommonCrudController(BookReader) {
  constructor(private readonly service: BookReaderService) {
    super(service);
  }
}
