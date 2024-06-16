export const config = {
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    dbName: 'telegraf-bot-mvp',
  },
  mongodb: {
    uri: process.env.MONGO_DB_URI,
  },
};
