import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    publicKey: string;

    @Prop({ required: true, unique: true })
    privateKey: string;
}

export const UserSchema = SchemaFactory.createForClass(User);