import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { logger } from '@services/winston.logger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger, //logger
    cors: true, //cors
  });
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Note BE')
    .setDescription('BE Server for View')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      responses: {
        '403': { description: 'Forbidden' },
        '404': { description: 'Not Found' },
      },
    },
  });
  //validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap()
  .then(() =>
    Logger.log(`Bootstrap on port ${process.env.PORT || 3000}`, `Application`),
  )
  .catch(Logger.error);
