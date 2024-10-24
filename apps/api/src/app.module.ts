import { Module } from '@nestjs/common';
import { UserModule } from '@api-core/user';
import { EmailModule } from '@api-core/email';
import { ConfigModule } from './config.module';
import { RedisModule } from '@api-core/redis';
import { NoteModule } from '@api-core/note';

@Module({
  imports: [ConfigModule, RedisModule, EmailModule, UserModule, NoteModule],
})
export class AppModule {}
