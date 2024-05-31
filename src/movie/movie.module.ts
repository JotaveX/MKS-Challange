import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'src/config/app-options.constants';
import * as redisStore from 'cache-manager-redis-store';

@Module({
imports: [PrismaModule, AuthModule, UserModule, CacheModule.registerAsync(RedisOptions)
],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
