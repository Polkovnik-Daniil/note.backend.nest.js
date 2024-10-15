import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailModule } from '@api-core/email';
import { DatabaseModule } from '@api-core/database/database.module';

@Module({
  imports: [forwardRef(() => EmailModule), forwardRef(() => DatabaseModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
