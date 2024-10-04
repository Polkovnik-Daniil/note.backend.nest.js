import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env.api', // Укажите путь к локальному конфигурационному файлу
      isGlobal: true, // Сделайте конфигурацию локальной для этого модуля
    }),
  ],
})
export class ConfigModule {}

// it is used to read data from the .env file
