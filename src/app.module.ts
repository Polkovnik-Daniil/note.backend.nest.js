import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';

import { ConfigModule } from 'src/config.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaModule } from '@db/prisma.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    ConfigModule, //Позволяет сперва подключить файл .env
    PrismaModule,
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
