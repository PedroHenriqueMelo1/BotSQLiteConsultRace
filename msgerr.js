class BotError  {
  constructor(msg, stats) {
this.message = msg
this.status = stats
  }

  Error() {
  
    return JSON.stringify({
      'Error': this.message,
       'Status': this.status
    })

  }

}



class Sucessful  {
  constructor(msg, stats) {
this.message = msg
this.status = stats
  }

  Next() {
  
    return JSON.stringify({
      'Message': this.message,
       'Status': this.status
    })

  }

}

module.exports = {Sucessful, BotError}