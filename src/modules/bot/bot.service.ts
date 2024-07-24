import { Injectable, OnModuleInit } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import bs58 from "bs58";

@Injectable()
export class BotService implements OnModuleInit {
    constructor(private telegramService: TelegramService) {}

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
}
