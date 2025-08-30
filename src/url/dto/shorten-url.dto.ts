import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShortenUrlDto {
  @ApiProperty({
    description: 'Long URL to be shortened',
    example: 'https://example.com',
  })
  @IsNotEmpty({ message: 'URL cannot be empty' })
  @IsString({ message: 'URL must be a string' })
  @IsUrl(
    {},
    {
      message:
        'Invalid URL format. Please provide a valid URL with protocol (e.g., https://example.com)',
    },
  )
  longUrl: string;
}
