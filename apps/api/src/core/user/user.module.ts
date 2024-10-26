import { UserService } from './user.service';
import { UserController } from './user.controller';
import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@api-core/database/database.module';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
