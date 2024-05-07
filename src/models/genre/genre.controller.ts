import { Controller } from '@nestjs/common';

import { GenreService } from './genre.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { Genre } from './genre.entity';

@Controller('genres')
export class GenreController extends CommonCrudController(Genre) {
  constructor(private readonly service: GenreService) {
    super(service);
  }
}
