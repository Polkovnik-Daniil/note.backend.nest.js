import { Injectable } from '@nestjs/common';


@Injectable()
export class DatabaseService {
  //constructor() {}
  getHello(): string {
    return 'Hello World!';
  }
}
