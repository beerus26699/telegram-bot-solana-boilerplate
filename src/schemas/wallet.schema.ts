import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Wallet & Document;

@Schema({
    timestamps: true,
})
export class Wallet {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    publicKey: string;

    @Prop({ required: true })
    hashPrivateKey: string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
