import {
    Update,
    Ctx,
    Start,
    Help,
    On,
    Hears,
    InjectBot,
    Command,
    Sender,
    Action,
    Message,
} from 'nestjs-telegraf';
import { UpdateType as TelegrafUpdateType } from 'telegraf/typings/telegram-types';
import { HainvBotName } from 'src/shared/constants/app.constant';
import { Scenes, Telegraf } from 'telegraf';
import { UpdateType } from 'src/shared/decorators/update-type.decorator';
import { TelegramService } from 'src/thirdparty/telegram/telegram.service';
import { MessageContent } from './bot.enum';
import BotCommand from './commands';
import { CustomMessage } from './interfaces/context.interface';

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

    @On('text')
    async onText(@Ctx() ctx: Scenes.WizardContext, @Message('text') msg: string,) {
        const message: CustomMessage = ctx.message;
        if (message.reply_to_message) {
            const repliedMessage = message.reply_to_message;
            if (
                repliedMessage.from.is_bot &&
                repliedMessage.from.username === ctx.botInfo.username &&
                repliedMessage.text === MessageContent.ImportWallet
            ) {
                // import private key
                console.log('private key: ', msg);
                return;
            }
        }
    }
}
