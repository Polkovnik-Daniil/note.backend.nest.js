import { forwardRef, Module } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';
import { DatabaseModule } from '@api-core/database/database.module';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule {}
