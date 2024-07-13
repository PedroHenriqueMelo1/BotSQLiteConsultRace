
const { RunDb } = require("../db");
const { Db } = require("sqlite3");
const {FetchData} = require("../../utils/test")


class DbUtils {
    constructor() {
     
      
    }
    



async Init(InitiDb) {
const DataBase = await RunDb()

return DataBase

}



async QueryTop10() {
const Db = await RunDb()

    return new Promise((resolve, reject) => {
 try {
    Db.all(`SELECT * FROM WeeklyWager ORDER BY WAGER DESC LIMIT 10`, function (err, rows) {
        if(err) {
            console.log('Erro ao buscar esses dados')
            reject(err)
            return
        }
        else {
            resolve(rows)
        }

    })
 } catch(err) {}
    })
    
}

async QueryAllUsers() {

const Db = await RunDb()

    return new Promise((resolve, reject) => {
        try {
          Db.all(`SELECT * from USERS`, function(err, rows) {
            if(err) {
                reject('Erro na consulta')
                throw new Error('Erro na consulta')

            }
       resolve(rows)

          })
        } catch(err) {

        }
    })
}


async ClearDbData() {
    const Db = await RunDb()
    return new Promise((resolve, reject) => {
        try{
  Db.run(`DELETE  FROM USERS`, function(err) {
    if(err) {
        console.log('Não consegui ')
        reject('err')
    }
    else{
  console.log('Dados apagados do DataBase')
  resolve('Sucessful')
    }
  })
        }catch(err) {}
    })
}



async Point0(user) {
    
    const db = await RunDb()

 return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM RainbetPoint0 WHERE RainbetUser = (?)`, [user], function(err, rows) {

      if(err) {
        reject('Not found')
      }
      
      resolve(rows)
       })

 })



}

async DailyDbPut() {
 
const db = await RunDb()
const Data = await FetchData()

const Query = () => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM WeeklyWager` , function(err) {
        if(err) {
            console.log(`Erro ao remover dados de weeklywager`)
            reject('Incorreto')
            return
    
        }
        console.log(`Dados de WeeklyWager Apagado`)
        resolve('Ok')
      })
  })
}

await Query()


Data.forEach((i) => {
  
    db.run(`INSERT into WeeklyWager (userid, wager) VALUES (?,?)`, [i.user, i.wager])
})

console.log('Dados de WeeklyWager reescrevido!')

}

async WeeklyDb(user) {
    const db = await RunDb()

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM WeeklyWager WHERE userid = (?)`, [user], function(err, rows) {
            if(err) {
                reject('User não encontrado no db')
            }
            resolve(rows)
        } )
    })
}

async LeardBoard() {
    const db = await RunDb()

    const queryconsult = () => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM LEADERBOARD`, (err) => {
                if(err) reject('Erro na query')
            })
        console.log(`Dados reescrevidos`)
        resolve('')
        })
    }

  const query =  await queryconsult()
 db.run(`INSERT INTO LeaderBoard (userid, wager)
 SELECT 
     r.RainbetUser AS userid,
     w.wager - r.wager AS wager
 FROM 
     RainbetPoint0 r
 JOIN 
     WeeklyWager w ON r.RainbetUser = w.userid;
 `, () => {
    console.log(`Tabela LeaderBoard reescrevidas com dados atualizados!`)
 })

 return query

}
async FetchTopLeardBoard() {
    const db = await RunDb()


    const queryconsult = () => {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM LEADERBOARD`, (err) => {
                if(err) reject('Erro na query')
            })
        console.log(`Dados reescrevidos`)
        resolve('')
        })
    }


    await queryconsult()

const Insert = () => {
    return new Promise((resolve, reject) => {
        
    db.run(`INSERT INTO LeaderBoard (userid, wager)
        SELECT 
            r.RainbetUser AS userid,
            w.wager - r.wager AS wager
        FROM 
            RainbetPoint0 r
        JOIN 
            WeeklyWager w ON r.RainbetUser = w.userid;
        `, () => {
           console.log(`Tabela LeaderBoard reescrevidas com dados atualizados!`)
        }, (err) => {
            if(err) {
                console.log('Erro ao fazer insert de dados')
                reject('401')
            }
            resolve(201)
        })
       
    })
}
  
await Insert()


const selectleardboard = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM LeaderBoard
            ORDER BY wager DESC
            LIMIT 10`, function(err, rows) {
    
                if(err) {
                    console.log('Erro')
                }
                resolve(rows)
            
            })
            
        
       }) 
    }
     
    return await selectleardboard()
    
}
  
}






module.exports = {DbUtils}