const { Dados } = require("./dateweekly");
const { RunDb } = require("../db");
const { Db } = require("sqlite3");



class DbUtils {
    constructor() {
     
      
    }
    



async Init(InitiDb) {
this.DataBase = await RunDb()

}

async QueryWager(us) {
  let Data = []

  try {
 const Db = await RunDb()

 return new Promise((resolve, reject ) => {
    Db.all(`SELECT WAGER FROM USERS WHERE UserRainbet = ?`, [us], (err, rows) => {
        if (err) {
            console.log('Erro na sua query')
            reject(err)
        }  else {
            if (rows.length == 0) {
               Data.push(rows)
            }
          
            resolve(rows)
        }
  
        
    })
 })
  } catch(err) {    
  console.log('Erro')
  }

    
}


async QueryTop10() {
const Db = await RunDb()

    return new Promise((resolve, reject) => {
 try {
    Db.all(`SELECT * FROM USERS ORDER BY WAGER DESC LIMIT 10`, function (err, rows) {
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

}



const Utils = new DbUtils




module.exports = {DbUtils}