import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { WalletsService } from './wallets.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Wallet.name,
                schema: WalletSchema,
            },
        ]),
    ],
    providers: [WalletsService],
    exports: [WalletsService],
})
export class WalletsModule {}
