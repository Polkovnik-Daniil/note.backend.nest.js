import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MySQL_HOST,
      port: Number(process.env.MySQL_PORT),
      username: process.env.MySQL_USERNAME,
      password: process.env.MySQL_PASSWORD,
      database: process.env.MySQL_DATABASE,
      entities: ['dist/models/**/*.entity.js'],
      synchronize: true,
      // migrations: [ 'dist/database/migrations/**/*.js' ],
      // cli: { migrationsDir: '/src/database/migrations' },
      autoLoadEntities: true,
    }),
  ],
})
export class TypeOrmModule {}
