const { Telegraf} = require('telegraf');
 const bot = new Telegraf('7330295245:AAGxQq2ZhEHgnMJcOmvbaSFL6lL7jtTntF4');
const { Start } = require("./bot/handlers/Start")
const { RunDb } = require("./bot/db");
const {DbUtils } = require("./bot/handlers/Dbfunctions")

const db = new DbUtils

async  function clear() {
 await db.ClearDbData()
 console.log('Dados excluidos')
}

Start(bot) // Startando bot


clear()


bot.launch(() => {
  console.log('Bot iniciado.')
})

