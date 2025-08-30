import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const provided = request.headers['x-api-key'] || request.headers['api-key'];
    const expected = this.configService.get<string>('API_KEY');
    if (!expected || !provided || provided !== expected) {
      throw new UnauthorizedException('Invalid API Key');
    }
    return true;
  }
}
