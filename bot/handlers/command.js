const { AdmMiddleWare, isAllowedToPutName, ActiveRace } = require('./MiddleWare');
const { Sucessful } = require('../../msgerr');
const { Markup } = require('telegraf');  // Adicionando importação do Markup
const {DbUtils} = require("./Dbfunctions");
const { RunDb } = require('../db');



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
                Markup.button.callback('Corrida Semanal 🏁', 'RACE'),
         
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

            if(!resultString) {
                ctx.reply('Não achei nada no banco de dados')
                return;
            }


 
        })

        this.bot.action
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


  async WeeklyAtt(user) {
    const Consult = new DbUtils

try {
 const Data =  await Consult.CalcWeekly(user)
 if(Data.length === 0) {
    throw new Error('Err')
 }

 return Data

} catch(err) {


return 'err'
}

  }

  async DataWeekly() {
    const Consult  = new DbUtils

    Consult.DailyDbPut()
  }


  async FetchPoint0(user) {

    const Consult = new DbUtils

try {
 const Data =  await Consult.Point0(user)
 if(Data.length === 0) {
    throw new Error('Err')
 }

 return Data

} catch(err) {


return 'err'
}

  }


  async FetchAtualWager(user) {
     const Consult = new DbUtils

     try {
      const Date = await Consult.WeeklyDb(user)
      return Date
     }
     catch(err) {
      console.log(`Promesa rejeitada user não encontrado no Banco de Dados: WeeklyWager`)
     }
  }

  async FetchLeaderBoard() {

    
    const Consult = new DbUtils

    const BoardLoading = await Consult.LeardBoard()

    try {
    const LeaderBoard = await Consult.FetchTopLeardBoard()
      return LeaderBoard
    } catch(err) {
      console.log(err)
    }
  }

  async
}





module.exports = { Commands };
