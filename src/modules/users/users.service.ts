import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = new this.userModel({ ...dto });
        await user.save();
        return true;
    }
}
