
const {Commands} = require("./command")
const {state} = require("./MiddleWare")


async function Start(bot)   {


  const commands = new Commands(bot)



  async function FetchWagerOfUser(user) {
 
    const Result = await commands.FetchPoint0(user)
    const ow = await commands.FetchAtualWager(user)

    try{
      const ActualWager = ow[0].wager || null
      const Point0Wager = Result[0].wager || null

if(Point0Wager == null ) {
  return 'SemWager'
}

      function CalcWeekly() {
      const AcWager = parseInt(ActualWager)
      const  Point0 = parseInt(Point0Wager)

  

      return AcWager - Point0
      }
     return CalcWeekly()
    }
    catch(err) {
      
  
    }

  }



  function ReplaceString(value) {

    const valor = parseInt(value)

    valor.toFixed(1

    )
    return   valor.toString().replace('.', ',')
   }


  bot.on('text', async (ctx) => {

    if(state.isAllowedToPutName) {
     const User = ctx.message.text


  console.log('Um user passou por aqui número de entradas ' )
    

     const WeeklyRace = await FetchWagerOfUser(User)

     if(WeeklyRace == undefined) {
      ctx.reply(`User não encontrado verifica o nome e tente novamente.`)
      return
     }
  
     if(WeeklyRace == 'SemWager') {
      ctx.reply(`Você não tem Wager Semanal`)
      return
     }

     const Leaderboard = await commands.FetchLeaderBoard()
     
     console.log(Leaderboard)

    ctx.reply(`${User} Aqui está Seu Wager Semanal R$${ReplaceString(WeeklyRace)} `)

    setTimeout(() => {

      ctx.reply(`*       LEADERBOARD 🏁 R$ 150,00 7 Dias
        1° \\- ${Leaderboard[0].userid} Wager:  R$ ${ReplaceString(Leaderboard[0].wager)} 🥇
        2 \\- ${Leaderboard[1].userid} Wager:  R$ ${ReplaceString(Leaderboard[1].wager)}  🥈
        3 \\- ${Leaderboard[2].userid} Wager:  R$ ${ReplaceString(Leaderboard[2].wager)}  🥉
        4 \\- ${Leaderboard[3].userid} Wager:  R$ ${ReplaceString(Leaderboard[3].wager)}
        5 \\- ${Leaderboard[4].userid} Wager:  R$ ${ReplaceString(Leaderboard[4].wager)}
        6 \\- ${Leaderboard[5].userid} Wager:  R$ ${ReplaceString(Leaderboard[5].wager)}
        7 \\- ${Leaderboard[6].userid} Wager:  R$ ${ReplaceString(Leaderboard[6].wager)}
        8 \\- ${Leaderboard[7].userid} Wager:  R$ ${ReplaceString(Leaderboard[7].wager)}
        9 \\- ${Leaderboard[8].userid} Wager:  R$ ${ReplaceString(Leaderboard[8].wager)}
        10 \\- ${Leaderboard[9].userid} Wager:  R$ ${ReplaceString(Leaderboard[9].wager)}*`, {parse_mode: "MarkdownV2"})
    }, 500)
  



  state.isAllowedToPutName = false;
       
   
     
   return;
  
    }

  });



  }
  
  

 
  
  module.exports = { Start }