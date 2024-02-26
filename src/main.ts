import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
}
bootstrap()
  .then(() =>
    Logger.log(`Bootstrap on port ${process.env.PORT || 3000}`, `Main`),
  )
  .catch(Logger.error);

  