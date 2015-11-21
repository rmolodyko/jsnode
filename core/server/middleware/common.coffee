express = require 'express'

class Common

  # Common middleware
  @set: (app)->
    app.use '/admin/resources', express.static(__dirname+'/../resources')
    app.set 'views', __dirname+"/../views"
    app.set 'view engine', 'jade'

module.exports = Common
