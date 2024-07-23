import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

@Injectable()
export class TelegramService {
    private readonly telegramGroupId: string;
    private readonly env: string;
    private enabled: boolean;

    constructor(
        @InjectBot() private bot: Telegraf<Scenes.SceneContext>,
        private configService: ConfigService,
    ) {
        this.env = configService.get<string>('app.nodeEnv');
        this.telegramGroupId = configService.get<string>('telegram.groupId');
        this.enabled = configService.get<boolean>('telegram.enabled');
    }

    async sendMessage(content: any, extra?: ExtraReplyMessage) {
        this.enabled &&
            this.bot.telegram.sendMessage(this.telegramGroupId, content, extra);
    }

    enableBot() {
        this.enabled = true;
        this.bot.launch();
    }

    disableBot() {
        this.enabled = false;
        this.bot.stop();
    }
}
