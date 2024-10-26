import { Module } from '@nestjs/common';
import { UserModule } from '@api-core/user';
import { EmailModule } from '@api-core/email';
import { ConfigModule } from './config.module';
import { RedisModule } from '@api-core/redis';
import { NoteModule } from '@api-core/note';
import { ReaderModule } from '@api-core/reader';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    EmailModule,
    UserModule,
    NoteModule,
    ReaderModule,
  ],
})
export class AppModule {}
