import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Allowlist } from './models/allowlist.model';
import { URL } from 'url';

@Injectable()
export class AllowlistService {
  constructor(
    @InjectModel(Allowlist)
    private allowlistModel: typeof Allowlist,
  ) {}

  async validateDomain(url: string): Promise<void> {
    const domain = this.extractDomain(url);
    const isAllowed = await this.isDomainAllowed(domain);

    if (!isAllowed) {
      throw new ForbiddenException(`Domain ${domain} is not in the allowlist`);
    }
  }

  private extractDomain(urlString: string): string {
    try {
      // Trim whitespace and remove any backticks that might be present
      const cleanUrl = urlString.trim().replace(/`/g, '');
      const url = new URL(cleanUrl);
      return url.hostname;
    } catch (error) {
      throw new ForbiddenException('Invalid URL format');
    }
  }

  async isDomainAllowed(domain: string): Promise<boolean> {
    const exactMatch = await this.allowlistModel.findOne({
      where: { domain },
    });

    if (exactMatch) return true;

    const wildcardDomain = domain.replace(/^[^.]+\./, '*.');
    const wildcardMatch = await this.allowlistModel.findOne({
      where: { domain: wildcardDomain },
    });

    return !!wildcardMatch;
  }

  async addDomain(domain: string): Promise<Allowlist> {
    if (!this.isValidDomainFormat(domain)) {
      throw new ForbiddenException('Invalid domain format');
    }
    const existing = await this.allowlistModel.findOne({
      where: { domain },
    });

    if (existing) {
      return existing;
    }

    return this.allowlistModel.create({ domain });
  }

  private isValidDomainFormat(domain: string): boolean {
    const domainRegex =
      /^(\*\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }
}
