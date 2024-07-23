import { Scenes } from 'telegraf';
import { BotActions } from '../bot.enum';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

export const startBot = async (ctx: Scenes.SceneContext) => {
    const wallet_address = 'wallet_address';
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

    const bottomButtons: { label: string; callbackAction: string }[][] = [
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

    const inlineKeyboards: InlineKeyboardButton[][] = bottomButtons.map((row) =>
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
};

export const setCommands = async (ctx: Scenes.SceneContext) => {
    await ctx.telegram.setMyCommands([
        { command: 'start', description: 'Start Bot' },
        { command: 'help', description: 'Help' },
    ]);
};
