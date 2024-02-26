import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './book.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class AuthorService extends CommonCrudService(Book) {
  constructor() {
    super();
  }
}
