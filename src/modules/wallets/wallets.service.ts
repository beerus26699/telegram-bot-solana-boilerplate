import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/wallet.dto';
import * as bcrypt from 'bcryptjs';
import { Wallet } from 'src/schemas/wallet.schema';

@Injectable()
export class WalletsService {
    constructor(
        @InjectModel(Wallet.name)
        private walletModel: Model<Wallet>,
    ) {}

    async createWallet(dto: CreateUserDto) {
        const hashPrivateKey = await bcrypt.hash(dto.privateKey, 5);
        const wallet = new this.walletModel({
            userId: dto.userId,
            username: dto.username,
            publicKey: dto.publicKey,
            hashPrivateKey,
        });
        await wallet.save();
        return true;
    }

    async findWalletsByUserId(userId: number) {
        return await this.walletModel.find({ userId });
    }

    async findWalletUserByPublicKey(userId: number, publicKey: string) {
        const wallet = await this.walletModel.findOne({ userId, publicKey });
        return wallet;
    }
}
