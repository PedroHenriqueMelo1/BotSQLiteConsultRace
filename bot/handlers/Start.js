
const {Commands} = require("./command")
const {state} = require("./MiddleWare")


async function Start(bot)   {



  const commands = new Commands(bot)


  async function FetchWagerOfUser(user) {
 
    const Result = await commands.FetchPoint0(user)
    const ow = await commands.FetchAtualWager('Whafe')

    const OldN = Result[0].wager
  const InDayDb = ow[0].wager



    if(Result == 'err') {
      console.log('Erro na sua promise provalvemente o user não está no nosso banco de dados')
      return
    }

var Wager = {
  'Point0': OldN,
  'Weekly': InDayDb
}

const oldNNum = parseInt(OldN, 10);
const inDayDbNum = parseInt(InDayDb, 10);
const Soma =  inDayDbNum - oldNNum

    return (Soma)

  }


  function ReplaceString(value) {

    return   value.toString().replace('.', ',')
   }


  bot.on('text', async (ctx) => {

    if(state.isAllowedToPutName) {
     const User = ctx.message.text


  console.log('Um user passou por aqui número de entradas ' )
    

     const WeeklyRace = await FetchWagerOfUser(User)



  
    ctx.reply(`${User} Aqui está Seu Wager Semanal  ${ReplaceString(WeeklyRace)}  `)
  



  state.isAllowedToPutName = false;
       
   
     
   return;
  
    }

  });



  }
  
  

 
  
  module.exports = { Start }