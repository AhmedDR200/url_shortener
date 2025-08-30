import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddDomainDto } from '../../allowlist/dto/add-domain.dto';
import { Allowlist } from '../../allowlist/models/allowlist.model';
import { ResolveUrlResponseDto } from '../dto/resolve-url-response.dto';
import { ShortenUrlResponseDto } from '../dto/shorten-url-response.dto';
import { ShortenUrlDto } from '../dto/shorten-url.dto';

export const ShortenUrlApiDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Shorten a long URL' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'URL has been successfully shortened',
      type: ShortenUrlResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid URL provided',
    }),
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Domain not allowed',
    }),
    ApiBody({ type: ShortenUrlDto, description: 'Long URL to be shortened' }),
  );
};

export const ResolveUrlApiDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Resolve a short URL to its original URL' }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Returns the original URL',
      type: ResolveUrlResponseDto,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Short URL not found',
    }),
  );
};

export const AddDomainApiDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Add a domain to the allowlist' }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Domain has been added to allowlist',
      type: Allowlist,
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'Domain already exists in allowlist',
    }),
    ApiBody({
      type: AddDomainDto,
      description: 'Domain to be added to allowlist',
    }),
  );
};
