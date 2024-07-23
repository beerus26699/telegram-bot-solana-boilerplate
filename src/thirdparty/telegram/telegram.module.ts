import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './telegram.service';
import { HainvBotName } from 'src/shared/constants/app.constant';
import { BotModule } from 'src/modules/bot/bot.module';

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                botName: HainvBotName,
                token: configService.get<string>('telegram.botToken'),
                launchOptions: !configService.get<boolean>('telegram.enabled')
                    ? configService.get<boolean>('telegram.enabled')
                    : {},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule {}
