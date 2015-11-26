express = require 'express'
bodyParser = require 'body-parser'

class Common

  # Common middleware
  @set: (app)->
    app.use bodyParser.urlencoded({extended: false})
    app.use do bodyParser.json
    app.use '/admin/resources', express.static(__dirname+'/../resources')
    app.use '/admin/dist', express.static(__dirname+'/../dist')
    app.set 'views', __dirname+"/../views"
    app.set 'view engine', 'jade'

exports = module.exports = Common
