import { Module } from '@nestjs/common';
import { APIModule } from '@database-core/api';
import { UserModule } from '@database-core/user';
import { PrismaModule } from '@database-core/prisma';

@Module({
  imports: [PrismaModule, APIModule, UserModule],
})
export class DatabaseModule {}
