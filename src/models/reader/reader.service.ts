import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reader } from './reader.entity';
import { CommonCrudService } from 'src/common/service/common.crud.service';

@Injectable()
export class ReaderService extends CommonCrudService(Reader) {
  constructor() {
    super();
  }
}
