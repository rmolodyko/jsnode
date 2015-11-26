express = require 'express'
config = require 'config'
Client = require './client/client'
Admin = require './server/admin'
app = express()



class App

  # Start app
  start: (port)->

    new Client(app)
    new Admin(app)

    # Start server
    app.listen port

    console.log "Server is running on #{port}"

module.exports = new App
