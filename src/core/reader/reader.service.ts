import { Injectable, Logger } from '@nestjs/common';

import { Reader } from './reader.entity';
import { CommonCrudService } from 'src/common/services/common.crud.service';

@Injectable()
export class ReaderService extends CommonCrudService(Reader) {
  constructor(public queryIsExists: string = 'select * from readers where') {
    super(queryIsExists);
  }
}
