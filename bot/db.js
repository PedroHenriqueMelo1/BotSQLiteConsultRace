const sqlite3 = require('sqlite3')
const path  = require('path')

const dbPath = path.resolve(__dirname, 'UserDb.db')


 async function RunDb() {
    const Db  = new sqlite3.Database(dbPath)

    return Db
}


  module.exports = {RunDb}