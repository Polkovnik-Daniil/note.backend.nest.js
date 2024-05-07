import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from 'src/config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { AuthorModule } from '@models/author';
import { BookModule } from '@models/book';
import { BookAuthorModule } from '@models/book.author';
import { BookGenreModule } from '@models/book.genre';
import { BookReaderModule } from '@models/book.reader';
import { GenreModule } from '@models/genre';
import { ReaderModule } from '@models/reader';
import { UserModule } from '@models/user';
import { RoleModule } from '@models/role';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule, //Позволяет сперва подключить файл .env
    TypeOrmModule,
    AuthorModule,
    BookModule,
    BookAuthorModule,
    BookGenreModule,
    BookReaderModule,
    GenreModule,
    ReaderModule,
    UserModule,
    RoleModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
