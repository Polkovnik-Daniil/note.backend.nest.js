import { Module } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { PrismaModule } from '@database-core/prisma';
import { ReaderRepository } from './reader.repository';
import { ReaderController } from './reader.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ReaderController],
  providers: [ReaderService, ReaderRepository],
})
export class ReaderModule {}
