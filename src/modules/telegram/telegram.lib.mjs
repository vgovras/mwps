import { session, Telegraf } from 'telegraf';
import { Mongo } from "@telegraf/session/mongodb";
import TelegrafLogger  from 'telegraf-logger';

import { config } from '../../config/config.module.mjs';

if (!config.telegram.token) {
  throw new TypeError('Telegram bot token not peovider.');
}

const store = Mongo({
	url: config.mongodb.uri,
	database: config.telegram.dbName,
});

const logger = new TelegrafLogger({
  log: console.log, 
  format: '%ut => @%u %fn %ln (%fi): <%ust> %c', 
  contentLength: 100, 
}); 

export const bot = new Telegraf(config.telegram.token);

bot.use(session({ store }));
bot.use(logger.middleware());

bot.on('message', async (ctx) => {
  ctx.session ??= { messageCount: 0 };
  await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
});

bot.launch(() => {
  console.log('bot started');
});
