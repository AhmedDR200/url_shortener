import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AllowlistService } from '../allowlist/allowlist.service';
import { Allowlist } from '../allowlist/models/allowlist.model';
import { ResolveUrlResponseDto } from './dto/resolve-url-response.dto';
import { ShortenUrlResponseDto } from './dto/shorten-url-response.dto';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ApiKeyGuard } from './guards/api-key.guard';
import { UrlService } from './url.service';

@Controller('api')
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly allowlistService: AllowlistService,
  ) {}

  @Post('url/shorten')
  @UseGuards(ApiKeyGuard)
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
  ): Promise<ShortenUrlResponseDto> {
    return this.urlService.shortenUrl(shortenUrlDto.longUrl);
  }

  @Get('url/:shortCode')
  async resolveUrl(
    @Param('shortCode') shortCode: string,
  ): Promise<ResolveUrlResponseDto> {
    return this.urlService.resolveUrl(shortCode);
  }

  @Post('url/allowlist')
  @UseGuards(ApiKeyGuard)
  async addDomain(@Body() domain: Allowlist): Promise<Allowlist> {
    return this.allowlistService.addDomain(domain.domain);
  }
}
