import { Module } from '@nestjs/common';
import { AllowlistService } from './allowlist.service';
import { Allowlist } from './models/allowlist.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Allowlist])],
  providers: [AllowlistService],
  exports: [AllowlistService],
})
export class AllowlistModule {}
