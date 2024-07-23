import { Injectable, Logger } from '@nestjs/common';

import { Genre } from './genre.entity';
import { CommonCrudService } from 'src/common/services/common.crud.service';

@Injectable()
export class GenreService extends CommonCrudService(Genre) {
  constructor() {
    super();
  }
}
