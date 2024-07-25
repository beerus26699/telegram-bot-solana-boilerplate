import { Scenes } from 'telegraf';
import { BotActions } from '../bot.enum';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { ArrayHelper } from 'src/shared/helpers/array.helper';

export const importWalletInlineButton: InlineKeyboardButton = {
    text: '🔌 Import Wallet',
    callback_data: BotActions.ImportWallet,
};

export const generateWalletInlineButton: InlineKeyboardButton = {
    text: '💳Generate Wallet',
    callback_data: BotActions.GenerateWallet,
};

const inlineActions = [
    importWalletInlineButton,
    generateWalletInlineButton,
    {
        text: '💰Buy/Sell',
        callback_data: BotActions.BuySell,
    },
    {
        text: '📌Limit Order',
        callback_data: BotActions.LimitOrder,
    },
    {
        text: '👥Copy Trading',
        callback_data: BotActions.CopyTrading,
    },
    {
        text: '🏦Asset',
        callback_data: BotActions.Asset,
    },
    {
        text: '💳Wallet',
        callback_data: BotActions.Wallet,
    },
    {
        text: '⚙️Settings',
        callback_data: BotActions.Settings,
    },
    {
        text: '🇺🇸Language',
        callback_data: BotActions.Language,
    },
    {
        text: '📖Help',
        callback_data: BotActions.Help,
    },
    {
        text: '🏆Invite friends',
        callback_data: BotActions.InviteFriends,
    },
    {
        text: 'Sol Bot',
        callback_data: BotActions.SolBot,
    },
];

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

    const bottomButtons: InlineKeyboardButton.CallbackButton[][] =
        ArrayHelper.sliceAndMerge(inlineActions, 2);

    const inlineKeyboards: InlineKeyboardButton[][] = bottomButtons.map((row) =>
        row.map(
            (button): InlineKeyboardButton => ({
                text: button.text,
                callback_data: button.callback_data,
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
