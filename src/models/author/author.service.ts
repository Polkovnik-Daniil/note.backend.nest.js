import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './author.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class AuthorService extends CommonCrudService(Author) {
  constructor() {
    super();
  }
}
