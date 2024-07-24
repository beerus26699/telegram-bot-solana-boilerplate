import { Scenes } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';

export interface Context extends Scenes.SceneContext {}
// export type CustomMessage = Message.TextMessage & {
//     reply_to_message?: CustomMessage;
// };

export type CustomMessage = Message & {
    text?: string;
    reply_to_message?: CustomMessage;
};
