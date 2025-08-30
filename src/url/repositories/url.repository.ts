import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Url } from '../models/url.model';

@Injectable()
export class UrlRepository {
  constructor(
    @InjectModel(Url)
    private urlModel: typeof Url,
  ) {}

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return this.urlModel.findOne({ where: { shortCode } });
  }

  async createMapping(shortCode: string, longUrl: string): Promise<Url> {
    return this.urlModel.create({ shortCode, longUrl });
  }
}
