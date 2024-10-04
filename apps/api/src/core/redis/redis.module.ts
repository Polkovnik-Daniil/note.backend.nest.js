import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: Number(process.env.TTL),
      store: redisStore,
      host:
        process.env.NODE_ENV === 'dev' ? 'localhost' : process.env.REDIS_HOST,
      port: process.env.NODE_ENV === 'dev' ? 6379 : process.env.REDIS_PORT,
    }),
  ],
})
export class RedisModule {}
