import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [
            process.env.NODE_ENV === 'dev' ? 'localhost:9092' : 'kafka:9092',
          ],
        },
        consumer: {
          groupId: 'email-consumer',
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
