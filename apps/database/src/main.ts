import { Partitioners } from 'kafkajs';
import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './database.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DatabaseModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [
            'localhost:9092', // todo: 'kafka:9092'
          ],
        },
        consumer: {
          groupId: 'database-consumer',
          //allowAutoTopicCreation: true,
        },
        producer: {
          createPartitioner: Partitioners.LegacyPartitioner,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
