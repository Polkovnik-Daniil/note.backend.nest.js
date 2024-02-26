import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthorService } from './author.service';
import { CommonCrudController } from 'src/common/controller/common.crud.controller';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController extends CommonCrudController(Author) {
  constructor(private readonly authorService: AuthorService) {
    super(authorService);
  }
}
