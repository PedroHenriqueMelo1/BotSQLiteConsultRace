const { Telegraf} = require('telegraf');
 const bot = new Telegraf('ENV_BOT');
const { Start } = require("./bot/handlers/Start")
const { RunDb } = require("./bot/db");
 


Start(bot) // Startando bot





bot.launch(() => {
  console.log('Bot iniciado.')
})

