import { ClientsModuleOptions, Transport } from '@nestjs/microservices';

export const EmailServiceOptions: ClientsModuleOptions = [
  {
    name: 'EMAIL_SERVICE',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api-email',
        brokers: ['localhost:9092'], // todo: kafka:9092
      },
      consumer: {
        groupId: 'email-consumer',
      },
    },
  },
];
