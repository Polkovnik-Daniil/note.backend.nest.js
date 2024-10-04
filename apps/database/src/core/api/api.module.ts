import { APIServiceOptions } from '@database-constants/api';
import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

@Global()
@Module({
  imports: [ClientsModule.register(APIServiceOptions)],
  exports: [ClientsModule],
})
export class APIModule {}
