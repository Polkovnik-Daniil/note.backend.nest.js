import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from 'src/config.module';
import { TypeOrmModule } from '@db/typeorm.module';
import { AuthorModule } from '@core/author';
import { BookModule } from '@core/book';
import { BookAuthorModule } from '@core/book.author';
import { BookGenreModule } from '@core/book.genre';
import { BookReaderModule } from '@core/book.reader';
import { GenreModule } from '@core/genre';
import { ReaderModule } from '@core/reader';
import { UserModule } from '@core/user';
import { RoleModule } from '@core/role';
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
  providers: [Logger]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
