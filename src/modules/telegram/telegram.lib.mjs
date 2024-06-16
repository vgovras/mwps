import { session, Telegraf } from 'telegraf';

if (process.env.BOT_TOKEN === undefined) {
  throw new TypeError('BOT_TOKEN must be provided!');
}

export const bot = new Telegraf();

bot.use(session());

bot.on('message', async (ctx) => {
  ctx.session ??= { messageCount: 0 };
  await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
});

bot.launch();
