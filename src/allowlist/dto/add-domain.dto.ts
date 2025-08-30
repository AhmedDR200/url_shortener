import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddDomainDto {
  @ApiProperty({
    description: 'Domain name to be added to the allowlist',
    example: 'example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  domain: string;
}
