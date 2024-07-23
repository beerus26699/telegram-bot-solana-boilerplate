import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
    botToken: process.env.TELEGRAM_BOT_TOKEN,
    enabled: process.env.TELEGRAM_BOT_ENABLED === 'true',
    groupId: process.env.TELEGRAM_GROUP_ID || '',
}));
