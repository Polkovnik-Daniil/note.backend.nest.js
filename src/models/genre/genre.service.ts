import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Genre } from './genre.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class GenreService extends CommonCrudService(Genre) {
  constructor() {
    super();
  }
}
