const admins = [1388585064, 1297713214, 2043863224];  // IDs dos administradores



var state = {
  isAllowedToPutName: false,
   ContagemDeConsultas: 1
};



const AdmMiddleWare = (ctx, next) => {
  console.log('Alguém está tentando usar o painel ADM');

  if (admins.includes(ctx.from.id)) {
    

    return next();  // Se o usuário for um admin, chama o próximo handler
  } else {
    return ctx.reply('Você não é adm');  // Caso contrário, responde com uma mensagem de erro
  }
};

const isAllowedToPutName = (ctx, next) => {
 console.log('Um usuário está passando pelo middleware contagem: ' + state.ContagemDeConsultas )
  state.isAllowedToPutName = true

state.ContagemDeConsultas++

  return  next()

}
 
const ActiveRace = (ctx, next) => {
  const ActiveRace = true
  if(ActiveRace) {
    next()
    return;
  }

 ctx.reply('Erro: Nenhuma corrida ativa no momento.')
}

module.exports= { AdmMiddleWare, isAllowedToPutName, state, ActiveRace };


