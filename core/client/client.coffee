config = require 'config'

class Client

  constructor: (@app)->

    @app.get '/', (req, res)=>
      @setMiddleWere(@app)
      res.render 'index'

  setMiddleWere: (app)->
    theme = config.get 'theme'
    app.set 'views', "./content/themes/#{theme}/views"
    app.set 'view engine', 'jade'

module.exports = Client
