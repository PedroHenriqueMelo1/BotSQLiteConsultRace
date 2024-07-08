
const {Commands} = require("./command")
const {state} = require("./MiddleWare")


async function Start(bot)   {



  const commands = new Commands(bot)


const DataFromDb = await commands.FetchDataFromDb()

  function ReplaceString(value) {

    return   value.toString().replace('.', ',')
   }


  bot.on('text', async (ctx) => {

    if(state.isAllowedToPutName) {
     const User = ctx.message.text
  n++
  console.log('Um user passou por aqui número de entradas ' + n)
     const Data =  await commands.ConsultWager(User)

     console.log(Data)

     if(Data.length === 0 ) {
      ctx.reply('Não encontrei o seu user no nosso banco de dados')
      state.isAllowedToPutName = false;
      return;
      
     }
   else{ ctx.reply(`${User} Aqui está Seu Wager Semanal R$ ${ReplaceString(Data[0].Wager)} Doláres `)
  }




 const top10index = await commands.ConsultTop10()


 const Top10 = top10index.map(item => ({
  UserRainbet: item.UserRainbet,
  Wager: item.Wager
}));



const leaderboardMessage = '*LEADERBOARD 🏁 R$ 150,00 7 DIAS*' +
`\n1 \\- ${Top10[0].UserRainbet}  Wager: \$${ReplaceString(Top10[0].Wager)} 🥇` +
`\n2 \\- ${Top10[1].UserRainbet}  Wager: \$${ReplaceString(Top10[1].Wager)} 🥈` +
`\n3 \\- ${Top10[2].UserRainbet}  Wager: \$${ReplaceString(Top10[2].Wager)} 🥉` +
`\n4 \\- ${Top10[3].UserRainbet}  Wager: \$${ReplaceString(Top10[3].Wager)}` +
`\n5 \\- ${Top10[4].UserRainbet}  Wager: \$${ReplaceString(Top10[4].Wager)}` +
`\n6 \\- ${Top10[5].UserRainbet}  Wager: \$${ReplaceString(Top10[5].Wager)}` +
`\n7 \\- ${Top10[6].UserRainbet}  Wager: \$${ReplaceString(Top10[6].Wager)}` +
`\n8 \\- ${Top10[7].UserRainbet}  Wager: \$${ReplaceString(Top10[7].Wager)}` +
`\n9 \\- ${Top10[8].UserRainbet}  Wager: \$${ReplaceString(Top10[8].Wager)}` +
`\n10 \\- ${Top10[9].UserRainbet}  Wager: \$${ReplaceString(Top10[9].Wager)}`;

 
      ctx.reply(leaderboardMessage, {parse_mode: "MarkdownV2"})


  state.isAllowedToPutName = false;
       
   
     
   return;
  
    }

  });



  }
  
  

 
  
  module.exports = { Start, }