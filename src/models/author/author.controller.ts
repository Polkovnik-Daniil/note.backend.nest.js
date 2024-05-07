import { Controller } from '@nestjs/common';

import { AuthorService } from './author.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController extends CommonCrudController(Author) {
  constructor(private readonly service: AuthorService) {
    super(service);
  }
}
