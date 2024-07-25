import { Injectable, OnModuleInit } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import bs58 from 'bs58';
import { CustomMessage } from './interfaces/context.interface';
import { Scenes } from 'telegraf';
import { MessageContent } from './bot.enum';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(private walletsService: WalletsService) {}

    async onModuleInit() {
        // this.telegramService.sendMessage('Test send message by bot...');

        const wallet_address = 'wallet_address';
        const private_key = 'private_key';

        // send private key & wallet address
        // const message =
        //     `👋 Welcome to GrowTradeBot!\n\n` +
        //     `A new wallet has been generated for you. This is your wallet address\n\n` +
        //     `${wallet_address}\n\n` +
        //     `<b>Save this private key below</b>❗\n\n` +
        //     `<tg-spoiler>${private_key}</tg-spoiler>\n\n` +
        //     `<b>To get started, please read our <a href="https://docs.growsol.io">docs</a></b>`;
    }

    async handleImportWallet(ctx: Scenes.SceneContext, msg: string) {
        const message: CustomMessage = ctx.message;
        const repliedMessage = message.reply_to_message;
        if (
            repliedMessage.from.is_bot &&
            repliedMessage.from.username === ctx.botInfo.username &&
            repliedMessage.text === MessageContent.ImportWallet
        ) {
            try {
                const privateKey = bs58.decode(msg);
                const keypair = Keypair.fromSecretKey(privateKey);
                const publicKey = keypair.publicKey.toBase58();

                const wallet =
                    await this.walletsService.findWalletUserByPublicKey(
                        ctx.from.id,
                        publicKey,
                    );
                if (!wallet) {
                    await this.walletsService.createWallet({
                        userId: ctx.from.id,
                        privateKey: msg,
                        publicKey,
                        username: ctx.from.username || ctx.from.first_name,
                    });
                }

                return true;
            } catch (error) {
                throw new Error('Private key is invalid');
            }
        }
    }

    async handleCreateWallet(ctx: Scenes.SceneContext) {
        const wallet = Keypair.generate();
        const publicKey = wallet.publicKey.toBase58();
        const privateKey = bs58.encode(wallet.secretKey);
        await this.walletsService.createWallet({
            userId: ctx.from.id,
            privateKey,
            publicKey,
            username: ctx.from.username || ctx.from.first_name,
        });

        return { publicKey, privateKey };
    }

    async handleGetWallets(userId: number) {
        const wallets = await this.walletsService.findWalletsByUserId(userId);
        return wallets;
    }
}
