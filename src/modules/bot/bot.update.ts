import { Update, Ctx, Start, Help, On, Message } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import { MessageContent } from './bot.enum';
import BotCommand from './commands';
import { CustomMessage } from './interfaces/context.interface';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
    constructor(private botService: BotService) {}
    @Start()
    async onStart(@Ctx() ctx: Scenes.SceneContext) {
        await BotCommand.setCommands(ctx);
        await BotCommand.startBot(ctx);
    }

    @Help()
    async onHelp(@Ctx() ctx: Scenes.SceneContext) {
        await BotCommand.help(ctx);
    }

    @On('text')
    async onText(
        @Ctx() ctx: Scenes.SceneContext,
        @Message('text') msg: string,
    ) {
        const message: CustomMessage = ctx.message;
        let replyMessage = '';
        if (message.reply_to_message) {
            try {
                await this.botService.handleImportWallet(ctx, msg);
                replyMessage = '✅ Import wallet success';
            } catch (error) {
                replyMessage = error.message;
            }
        }

        await ctx.reply(replyMessage);
    }
}
