import { Module } from '@nestjs/common';
import { TelegramModule } from 'src/thirdparty/telegram/telegram.module';
import { BotUpdate } from './bot.update';
import { BotAction } from './bot.action';
import { BotService } from './bot.service';
import { WalletsModule } from '../users/users.module';

@Module({
    imports: [TelegramModule, WalletsModule],
    providers: [BotUpdate, BotAction, BotService],
})
export class BotModule {}
