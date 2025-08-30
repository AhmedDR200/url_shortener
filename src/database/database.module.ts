import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Allowlist } from '../allowlist/models/allowlist.model';
import { Hit } from '../url/models/hit.model';
import { Url } from '../url/models/url.model';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const logger = new Logger('Sequelize');
        const options = {
          dialect: 'mysql' as const,
          host: config.get<string>('DB_HOST', 'localhost'),
          port: parseInt(config.get<string>('DB_PORT', '3306'), 10),
          username: config.get<string>('DB_USER', 'root'),
          password: config.get<string>('DB_PASS', ''),
          database: config.get<string>('DB_NAME', 'url_shortener'),
          models: [Url, Allowlist, Hit],
          autoLoadModels: true,
          synchronize: false,
          logging: false,
        };
        logger.log(
          `Sequelize options prepared for ${options.host}:${options.port}`,
        );
        return options;
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [SequelizeModule, DatabaseService],
})
export class DatabaseModule {}
