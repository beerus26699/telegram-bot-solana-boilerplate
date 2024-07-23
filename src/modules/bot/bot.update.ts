import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
    InjectBot,
    Command,
    Message,
    Sender,
    Action,
} from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { HainvBotName } from 'src/shared/constants/app.constant';
import { Scenes, Telegraf } from 'telegraf';
import { UpdateType } from 'src/shared/decorators/update-type.decorator';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotActions } from './bot.enum';

@Update()
export class BotUpdate {
    constructor(private telegramService: TelegramService) {}
    @Start()
    async onStart(@Ctx() ctx: Scenes.SceneContext): Promise<string> {
        const wallet_address = 'wallet_address';
        // await this.telegramService.sendMessage('👍');
        const message =
            `Default wallet: ${wallet_address}\n` +
            `Wallet address: \`--\`\n` +
            `Wallet balance: --E\n` +
            `\n` +
            `Default transaction parameters\n` +
            `⚡️Turbo mode slippage: 5.0%\n` +
            `🛡Anti-MEV mode slippage: Unlimited\n` +
            `🟢Buy gas priority fee: +16 Gwei\n` +
            `🔴Sell gas priority fee: +6 Gwei\n`;

        const bottmButtons: { label: string; callbackAction: string }[][] = [
            [
                {
                    label: '🔌 Import Wallet',
                    callbackAction: BotActions.ImportWallet,
                },
                {
                    label: '💳Generate Wallet',
                    callbackAction: BotActions.GenerateWallet,
                },
            ],
            [
                {
                    label: '💰Buy/Sell',
                    callbackAction: BotActions.BuySell,
                },
                {
                    label: '📌Limit Order',
                    callbackAction: BotActions.LimitOrder,
                },
            ],
            [
                {
                    label: '👥Copy Trading',
                    callbackAction: BotActions.CopyTrading,
                },
                {
                    label: '🏦Asset',
                    callbackAction: BotActions.Asset,
                },
            ],
            [
                {
                    label: '💳Wallet',
                    callbackAction: BotActions.Wallet,
                },
                {
                    label: '⚙️Settings',
                    callbackAction: BotActions.Settings,
                },
            ],
            [
                {
                    label: '🇺🇸Language',
                    callbackAction: BotActions.Language,
                },
                {
                    label: '📖Help',
                    callbackAction: BotActions.Help,
                },
            ],
            [
                {
                    label: '🏆Invite friends',
                    callbackAction: BotActions.InviteFriends,
                },
                {
                    label: 'Sol Bot',
                    callbackAction: BotActions.SolBot,
                },
            ],
        ];

        const inlineKeyboards: InlineKeyboardButton[][] = bottmButtons.map(
            (row) =>
                row.map(
                    (button): InlineKeyboardButton => ({
                        text: button.label,
                        callback_data: button.callbackAction,
                    }),
                ),
        );
        await ctx.replyWithHTML(message, {
            parse_mode: 'HTML',
            reply_markup: { inline_keyboard: inlineKeyboards },
        });
        return `Hey, I'm Hai`;
    }

    // @Help()
    // async onHelp(): Promise<string> {
    //     return 'Send me any text';
    // }

    // @Command('admin')
    // onAdminCommand(): string {
    //     return 'Welcome judge';
    // }

    // @Hears(['hi', 'hello', 'hey', 'qq'])
    // onGreetings(
    //     @UpdateType() updateType: TelegrafUpdateType,
    //     @Sender('first_name') firstName: string,
    // ): string {
    //     return `Hey ${firstName}`;
    // }

    // @Command('scene')
    // async onSceneCommand(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    //   await ctx.scene.enter('HELLO_SCENE_ID');
    // }

    // @On('text')
    // onMessage(@Message('text') reversedText: string): string {
    //     console.log('🚀 ~ BotUpdate ~ reversedText:', reversedText);
    //     return reversedText;
    // }

    // @On('sticker')
    // async on(@Ctx() ctx: Scenes.SceneContext) {
    //     await ctx.reply('👍');
    // }
}
