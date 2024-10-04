import { DatabaseServiceOptions } from '@api-constants/database';
import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

@Global()
@Module({
  imports: [ClientsModule.register(DatabaseServiceOptions)],
  exports: [ClientsModule],
})
export class DatabaseModule {}
