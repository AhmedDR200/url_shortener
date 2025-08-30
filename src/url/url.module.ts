import { CacheModule } from '@nestjs/cache-manager';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AllowlistModule } from '../allowlist/allowlist.module';
import { Hit } from './models/hit.model';
import { Url } from './models/url.model';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { UrlRepository } from './repositories/url.repository';
import { HitRepository } from './repositories/hit.repository';
import { urlLimiter } from '../rate-limiting/rate-limiting.middleware';

@Module({
  imports: [
    CacheModule.register(),
    AllowlistModule,
    SequelizeModule.forFeature([Url, Hit]),
  ],
  providers: [UrlService, UrlRepository, HitRepository],
  controllers: [UrlController],
})
export class UrlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(urlLimiter)
      .forRoutes({ path: 'api/url/:shortCode', method: RequestMethod.GET });
  }
}
