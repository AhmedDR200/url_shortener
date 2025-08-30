import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortenUrlDto {
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
