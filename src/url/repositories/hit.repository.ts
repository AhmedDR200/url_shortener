import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hit } from '../models/hit.model';

@Injectable()
export class HitRepository {
  constructor(
    @InjectModel(Hit)
    private hitModel: typeof Hit,
  ) {}

  async createHit(urlId: number, ipAddress: string): Promise<Hit> {
    return this.hitModel.create({
      urlId,
      ipAddress,
      timestamp: new Date(),
    });
  }
}
