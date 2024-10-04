import { Module } from '@nestjs/common';
import { APIModule } from '@database-core/api';
import { UserModule } from '@database-core/user';
import { PrismaModule } from '@database-core/prisma';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';

@Module({
  imports: [PrismaModule, APIModule, UserModule],
  controllers: [DatabaseController],
  providers: [DatabaseService],
})
export class DatabaseModule {}
