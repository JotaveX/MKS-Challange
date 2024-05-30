import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";


export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      isGlobal: true,
      store: redisStore,
      host: configService.get('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
      auth_pass: configService.get('REDIS_PASSWORD'),
      ttl: 300, 
    };
  },
  inject: [ConfigService],
};
