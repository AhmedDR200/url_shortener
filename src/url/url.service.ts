import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { Request } from 'express';
import { UrlRepository } from './repositories/url.repository';
import { HitRepository } from './repositories/hit.repository';
import { AllowlistService } from '../allowlist/allowlist.service';

@Injectable()
export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly hitRepository: HitRepository,
    private readonly allowlistService: AllowlistService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async shortenUrl(
    longUrl: string,
  ): Promise<{ shortCode: string; originalUrl: string }> {
    const cleanUrl = longUrl.trim().replace(/`/g, '');
    const domain = new URL(cleanUrl).hostname;
    await this.allowlistService.validateDomain(cleanUrl);

    const shortCode = this.generateShortCode();
    await this.urlRepository.createMapping(shortCode, cleanUrl);

    await this.cacheManager.set(shortCode, cleanUrl, 3600);

    return {
      shortCode,
      originalUrl: cleanUrl,
    };
  }

  async resolveUrl(
    shortCode: string,
    request?: Request,
  ): Promise<{ shortCode: string; longUrl: string }> {
    const cachedUrl = await this.cacheManager.get<string>(shortCode);
    if (cachedUrl) {
      this.recordHit(shortCode, request);
      return {
        shortCode,
        longUrl: cachedUrl,
      };
    }

    const mapping = await this.urlRepository.findByShortCode(shortCode);
    if (!mapping) {
      throw new NotFoundException('Short URL not found');
    }

    await this.cacheManager.set(shortCode, mapping.longUrl, 3600);

    this.recordHit(shortCode, request);

    return {
      shortCode,
      longUrl: mapping.longUrl,
    };
  }

  private generateShortCode(): string {
    return Math.random().toString(36).substring(2, 10);
  }

  private async recordHit(shortCode: string, request?: Request): Promise<void> {
    try {
      const mapping = await this.urlRepository.findByShortCode(shortCode);
      if (!mapping) return;

      const ipAddress = request?.ip || 'unknown';
      await this.hitRepository.createHit(mapping.id, ipAddress);
    } catch (error) {
      console.error('Failed to record hit:', error);
    }
  }
}
