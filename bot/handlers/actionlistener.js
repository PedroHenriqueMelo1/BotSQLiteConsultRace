const {isAllowedToPutName} = require('./MiddleWare')


function ActionListener(bot) {

    bot.action('RACE', isAllowedToPutName,  (ctx) => {
        ctx.reply(`Envie seu usuário na RAINBET para consultar seu nome na corrida`)
      
      })
}


module.exports = {ActionListener}