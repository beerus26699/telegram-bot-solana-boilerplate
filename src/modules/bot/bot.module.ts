import { Module } from '@nestjs/common';
import { TelegramModule } from 'src/thirdparty/telegram/telegram.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { RandomNumberScene } from './random-number.scene';
import { BotAction } from './bot.action';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TelegramModule, UsersModule],
    providers: [BotService, BotUpdate, BotAction, RandomNumberScene],
})
export class BotModule {}
