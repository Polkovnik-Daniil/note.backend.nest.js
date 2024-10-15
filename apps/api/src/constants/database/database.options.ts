import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';

export const DatabaseServiceOptions: ClientsModuleOptions = [
  {
    name: 'DATABASE_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-database',
        brokers: ['localhost:9092'], // todo: kafka:9092
      },
      consumer: {
        groupId: 'database-consumer',
      },
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
      },
    },
  },
];
