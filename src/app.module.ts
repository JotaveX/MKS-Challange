import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { RedisOptions } from 'src/config/app-options.constants';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule, MovieModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  // CacheModule.registerAsync(RedisOptions)
  CacheModule.register({
    store: require('cache-manager-redis-store'),
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 300,
    auth_pass: process.env.REDIS_PASSWORD
  })
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }],
})
export class AppModule {}
