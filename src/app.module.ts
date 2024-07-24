import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AllExceptionsFilter } from './middleware/exception/exception.filter';
import DatabaseConfig from './config/database.config';
import AppConfig from './config/app.config';
import TelegramConfig from './config/telegram.config';
import { TelegramModule } from './thirdparty/telegram/telegram.module';
import { BotModule } from './modules/bot/bot.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [DatabaseConfig, AppConfig, TelegramConfig],
        }),
        BotModule,
        DatabaseModule,
        TelegramModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {}
