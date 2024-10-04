import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { EmailServiceOptions } from '@api-constants/email';

@Global()
@Module({
  imports: [ClientsModule.register(EmailServiceOptions)],
  exports: [ClientsModule],
})
export class EmailModule {}
