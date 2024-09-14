import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from 'src/config.module';
import { CustomeLoggerMiddleware } from './middlewares/logger.middleware';
import { PrismaModule } from '@db/prisma.module';
import { UserModule } from '@core/user';
import { RedisModule } from '@core/redis';

@Module({
  imports: [
    ConfigModule, //Позволяет сперва подключить файл .env
    RedisModule,
    PrismaModule,
    UserModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    //Custom Logger for Route
    consumer.apply(CustomeLoggerMiddleware).forRoutes('*');
  }
}
