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
            process.env.NODE_ENV === 'dev' ? 'localhost:9092' : 'kafka:9092',
          ],
        },
        consumer: {
          groupId: 'database-consumer',
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
