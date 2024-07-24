import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Context, Scenes } from 'telegraf';
import { BotActions, MessageContent } from './bot.enum';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { UsersService } from '../users/users.service';
import { importWalletInlineButton, generateWalletInlineButton } from './commands/start.command';

@Update()
export class BotAction {
    constructor(private usersService: UsersService) {}

    @Action(BotActions.ImportWallet)
    async actionImportWallet(@Ctx() ctx: Context) {
        // // Explicit usage
        // await ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

        // // Using context shortcut
        // await ctx.answerCbQuery('1231');
        // const result = []
        // // Explicit usage
        // await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

        // // Using context shortcut
        // await ctx.answerInlineQuery(result)

        // await ctx.replyWithSticker('123123jkbhj6b')
        // ctx.reply('hello', {message_thread_id: 139})
        // ctx.wizard.state.contactData = {};
        // return ctx.wizard.next();
        // ctx.session.myData.preferenceType = 'Theater';
        // return ctx.scene.enter('SOME_OTHER_SCENE_ID'); // switch to some other scene

        // const message = await ctx.reply('Enter private key');
        // console.log("🚀 ~ BotAction ~ actionImportWallet ~ message:", message)
        // await ctx.deleteMessage(130);
        // await ctx.editMessageText('Enter private key 1');
        // console.log(ctx.update.reply_markup);
        // console.log(ctx.deleteMessage(124));
        // await ctx.inlineMessageId()('asb', {message_thread_id: 124})

        await ctx.reply(MessageContent.ImportWallet, {
            reply_markup: {
                force_reply: true,
                input_field_placeholder: MessageContent.ImportWallet,
            },
        });
    }

    @Action(BotActions.GenerateWallet)
    async actionGenerateWallet(@Ctx() ctx: Scenes.SceneContext) {
        const wallet = Keypair.generate();
        const publicKey = wallet.publicKey.toBase58();
        const privateKey = bs58.encode(wallet.secretKey);
        const text =
            `✅ Wallet generated successfully:\n` +
            `Wallet address: <code>${publicKey}</code>\n` +
            `Wallet private key: <tg-spoiler>${privateKey}</tg-spoiler>`;

        await this.usersService.createUser({
            userId: ctx.from.id,
            privateKey,
            publicKey,
            username: ctx.from.username || ctx.from.first_name,
        });
        await ctx.reply(text, { parse_mode: 'HTML' });
    }

    @Action(BotActions.BuySell)
    async actionBuySell(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You clickBuySell');
    }

    @Action(BotActions.LimitOrder)
    async actionLimitOrder(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click LimitOrder');
    }

    @Action(BotActions.CopyTrading)
    async actionCopyTrading(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click CopyTrading');
    }

    @Action(BotActions.Asset)
    async actionAsset(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click Asset');
    }

    @Action(BotActions.Wallet)
    async actionWallet(@Ctx() ctx: Scenes.SceneContext) {
        const userId = ctx.from.id;

        const wallets = await this.usersService.findWalletsByUserId(userId);
        const content =
            `Wallets (${wallets.length}) 💳\n` +
            '----------------------------------------------------------------------------------------------------\n';

        const inlineWallets = wallets.map((wallet, index) => [
            { text: `${index+1}. ${wallet.publicKey}`, callback_data: 'default' },
            { text: '0.000 SOL', callback_data: 'default' },
            { text: '0.000 WSOL', callback_data: 'default' },
        ])
        await ctx.reply(content, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [...inlineWallets, [importWalletInlineButton, generateWalletInlineButton]],
            },
        });
    }

    @Action(BotActions.Settings)
    async actionSettings(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click Settings');
    }

    @Action(BotActions.Language)
    async actionLanguage(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click Language');
    }

    @Action(BotActions.Help)
    async actionHelp(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click Help');
    }

    @Action(BotActions.InviteFriends)
    async actionInviteFriends(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click InviteFriends');
    }

    @Action(BotActions.SolBot)
    async actionSolBot(@Ctx() ctx: Scenes.SceneContext) {
        await ctx.reply('You click SolBot');
    }
}
