import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { WalletsService } from './users.service';

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
