import { Module } from '@nestjs/common';
import { TelegramModule } from 'src/thirdparty/telegram/telegram.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { RandomNumberScene } from './random-number.scene';
import { BotAction } from './bot.action';

@Module({
    imports: [TelegramModule],
    providers: [BotService, BotUpdate, BotAction, RandomNumberScene],
})
export class BotModule {}
