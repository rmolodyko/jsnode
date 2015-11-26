yaml = require 'js-yaml'
fs = require 'fs'
Route = require './lib/route'
MiddlewareCommon = require './middleware/common'
routes = yaml.safeLoad fs.readFileSync __dirname+'/config/routes.yaml'
params = yaml.safeLoad fs.readFileSync __dirname+'/config/default.yaml'
DI = require './lib/di'

class Admin

  # Instantiate admin app
  constructor: (@app)->

    # Set common middleware
    MiddlewareCommon.set(@app)

    di = DI.getInstance()

    # Set routes on admin
    route = di.create(__dirname+'/lib/route')
    route.assign(@app, params.endpoint, routes, params)

module.exports = Admin