import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
    InjectBot,
    Command,
    Message,
    Sender,
    Action,
} from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { HainvBotName } from 'src/shared/constants/app.constant';
import { Scenes, Telegraf } from 'telegraf';
import { UpdateType } from 'src/shared/decorators/update-type.decorator';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { BotActions } from './bot.enum';
import BotCommand from './commands';

@Update()
export class BotUpdate {
    constructor(private telegramService: TelegramService) {}
    @Start()
    async onStart(@Ctx() ctx: Scenes.SceneContext) {
        await BotCommand.setCommands(ctx);
        await BotCommand.startBot(ctx);
    }

    @Help()
    async onHelp(@Ctx() ctx: Scenes.SceneContext) {
        await BotCommand.help(ctx);
    }
}
