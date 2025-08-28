import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        @InjectConnection() private readonly sequelize: Sequelize,
    ) { }

    async onModuleInit() {
        const maxAttempts = 5;
        let attempt = 0;
        while (attempt < maxAttempts) {
            try {
                attempt++;
                this.logger.log(`DB connect attempt ${attempt}/${maxAttempts}...`);
                await this.sequelize.authenticate();
                this.logger.log('Database connection established.');
                return;
            } catch (err) {
                const delayMs = Math.min(30000, 500 * 2 ** attempt);
                this.logger.warn(`DB connect failed (attempt ${attempt}). Retrying in ${delayMs}ms...`);
                this.logger.debug(String(err));
                await this.sleep(delayMs);
            }
        }
        this.logger.error(`Unable to connect to DB after ${maxAttempts} attempts.`);
        throw new Error('Database connection failed');
    }

    private sleep(ms: number) {
        return new Promise((res) => setTimeout(res, ms));
    }
}
