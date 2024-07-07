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
        this.AdmPainel()
    }

    admin() {
        
            this.bot.command('admin', AdmMiddleWare,  (ctx) => {
                const stts = new Sucessful('Welcome to Painel', 200);
                ctx.reply(stts.Next());
    
          ctx.reply(`Selecione uma das consulta`, Markup.inlineKeyboard([
            Markup.button.callback('Consultar corrida - Wager', 'CONSULTALL'),
            Markup.button.callback('Consulta individual', 'CONSULTU'),
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

    async AdmPainel() {
        this.bot.action('CONSULTU', (ctx) => {
            ctx.reply('Use /start clique em race e então digite o nome do user que você quer verificar')
        })



        this.bot.action('CONSULTALL', async (ctx) => {
            const Consult = new DbUtils

            const query = await Consult.QueryAllUsers()

            const resultmap = query.map(row => `UserRainbet: ${row.UserRainbet}, Wager: ${row.Wager}`);
          
            
            const resultString = resultmap.join('\n');

            ctx.reply(resultString)


 
        })
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


  async FetchDataFromDb() {
    const Consult = new DbUtils

    const query = await Consult.QueryAllUsers()

    const resultmap = query.map(row => `UserRainbet: ${row.UserRainbet}, Wager: ${row.Wager}`);
  
    
    const resultString = resultmap.join('\n');

    console.log(resultString)

  }
  }





module.exports = { Commands };
