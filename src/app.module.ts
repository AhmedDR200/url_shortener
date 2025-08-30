import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AllowlistModule } from './allowlist/allowlist.module';
import { CacheService } from './cache/cache.service';
import { DatabaseModule } from './database/database.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
        ttl: configService.get('CACHE_TTL', 3600),
        max: configService.get('CACHE_MAX_ITEMS', 1000),
        isGlobal: true,
      }),
    }),
    DatabaseModule,
    UrlModule,
    AllowlistModule,
  ],
  providers: [CacheService],
})
export class AppModule {}
