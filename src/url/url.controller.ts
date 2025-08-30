import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AllowlistService } from '../allowlist/allowlist.service';
import { AddDomainDto } from '../allowlist/dto/add-domain.dto';
import { Allowlist } from '../allowlist/models/allowlist.model';
import { ResolveUrlResponseDto } from './dto/resolve-url-response.dto';
import { ShortenUrlResponseDto } from './dto/shorten-url-response.dto';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ApiKeyGuard } from './guards/api-key.guard';
import {
  AddDomainApiDocs,
  ResolveUrlApiDocs,
  ShortenUrlApiDocs,
} from './swagger/swagger.prop';
import { UrlService } from './url.service';

@ApiTags('URL')
@Controller('api')
@ApiSecurity('x-api-key', [])
export class UrlController {
  constructor(
    private readonly urlService: UrlService,
    private readonly allowlistService: AllowlistService,
  ) {}

  @Post('url/shorten')
  @UseGuards(ApiKeyGuard)
  @ShortenUrlApiDocs()
  async shortenUrl(
    @Body() shortenUrlDto: ShortenUrlDto,
  ): Promise<ShortenUrlResponseDto> {
    return this.urlService.shortenUrl(shortenUrlDto.longUrl);
  }

  @Get('url/:shortCode')
  @ResolveUrlApiDocs()
  async resolveUrl(
    @Param('shortCode') shortCode: string,
  ): Promise<ResolveUrlResponseDto> {
    return this.urlService.resolveUrl(shortCode);
  }

  @Post('url/allowlist')
  @UseGuards(ApiKeyGuard)
  @AddDomainApiDocs()
  async addDomain(@Body() domain: AddDomainDto): Promise<Allowlist> {
    return this.allowlistService.addDomain(domain.domain);
  }
}
