import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailModule } from '@api-core/email';

@Module({
  imports: [forwardRef(() => EmailModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
