const { Dados } = require("./dateweekly");
const { RunDb } = require("../db");
const { Db } = require("sqlite3");
const {FetchData} = require("../../Test/test")


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

async Point0() {
    const Date = await FetchData()
    
return Date}

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

Data.forEach((i) => {
    db.run(`INSERT into WeeklyWager (userId, wager) VALUES (?,?)`, [i.user, i.wager])
})

console.log('Dados Atualiados!')

}


async CalcWeeklyy(user) {
    const db = await RunDb()
    
    return new Promise((resolve, reject) => {
        db.all(`SELECT * from WeeklyWager WHERE userid = ?`, [user], function(err, rows) {
            if(err) {
                reject('Erro na promise')

            }
            resolve(rows)
        })
    })

}


}



const Utils = new DbUtils




module.exports = {DbUtils}