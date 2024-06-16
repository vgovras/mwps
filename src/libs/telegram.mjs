import { session, Telegraf } from 'telegraf';
import { Mongo } from "@telegraf/session/mongodb";
import TelegrafLogger  from 'telegraf-logger';

import { config } from '../config/config.module.mjs';

if (!config.telegram.token) {
  throw new TypeError('Telegram bot token not peovider.');
}

export const bot = new Telegraf(config.telegram.token);


function launch() {
    const store = Mongo({
        url: config.mongodb.uri,
        database: config.telegram.dbName,
    });

    const logger = new TelegrafLogger({
    log: console.log, 
    format: '%ut => @%u %fn %ln (%fi): <%ust> %c', 
    contentLength: 100, 
    }); 


    bot.use(session({ store }));
    bot.use(logger.middleware());

    bot.on('message', async (ctx) => {
    ctx.session ??= { messageCount: 0 };
    await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
    });

    return bot.launch(() => {
        console.log('Telegram bot started.');
    });
}

export default {
    launch,
}