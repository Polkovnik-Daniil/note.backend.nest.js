import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const APIServiceOptions: ClientsModuleOptions = [
  {
    name: 'API_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'database-api',
        brokers: ['localhost:9092'], // todo: kafka:9092
      },
      consumer: {
        groupId: 'api-consumer',
      },
    },
  },
];
