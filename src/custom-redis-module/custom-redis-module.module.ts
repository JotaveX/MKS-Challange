import { Module } from '@nestjs/common';
import { RedisModule, RedisService } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('REDIS_HOST') || '127.0.0.1',
        port: parseInt(configService.get<string>('REDIS_PORT'), 10) || 6379,
        retryStrategy: (times: number) => Math.min(times * 50, 2000),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RedisService],
})
export class CustomRedisModule {}
