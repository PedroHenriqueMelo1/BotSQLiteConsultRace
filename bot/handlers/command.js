const { AdmMiddleWare, isAllowedToPutName, ActiveRace } = require('./MiddleWare');
const { Sucessful } = require('../../msgerr');
const { Markup } = require('telegraf');  // Adicionando importação do Markup
const {DbUtils} = require("./Dbfunctions")



class Commands {
    constructor(bot) {
        this.bot = bot;
        this.Inicialize()
        
    }

    Inicialize() {
        this.admin()
        this.start()
        this.raceAction()
    }

    admin() {
        
        this.bot.command('admin', AdmMiddleWare, (ctx) => {
            const stts = new Sucessful('Welcome to Painel', 200);
            ctx.reply(stts.Next());
 
          ctx.reply(`Selecione uma das consulta`, Markup.inlineKeyboard([
            Markup.button.callback('Consultas feitas', 'CONSULTN'),
            Markup.button.callback('Corrida', 'RACEN')
          ]))
        });
    }

    start() {
        this.bot.start((ctx) => {
            const userid = ctx.from.first_name;  
            ctx.reply(`Olá ${userid} O que deseja fazer?`, Markup.inlineKeyboard([
                Markup.button.callback('Corrida Semanal 🏁', 'RACE')
            ]));
        });
    }
 
       

    raceAction() {
        this.bot.action('RACE', ActiveRace, isAllowedToPutName , (ctx) => {
            ctx.reply('Envie seu usuário na RAINBET para consultar seu nome na corrida');
           
        });
    }

    
    async ConsultWager(User) {
        const Consult = new DbUtils

      const ConsultData = await  Consult.QueryWager(User)


      return ConsultData

        
    }
  
    ShowRace(ctx) {
       ctx.reply(`*LEADERBOARD  🏁  - 7 Dias R$ 150,00*`)
          

    }

  async ConsultTop10() {
    const Consult = new DbUtils

    const ConsultData =  await Consult.QueryTop10()

    return ConsultData
  }
 }





module.exports = { Commands };
