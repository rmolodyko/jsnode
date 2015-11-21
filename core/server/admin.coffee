yaml = require 'js-yaml'
fs = require 'fs'
Route = require './lib/route'
MiddlewareCommon = require './middleware/common'
routes = yaml.safeLoad fs.readFileSync __dirname+'/config/routes.yaml'
params = yaml.safeLoad fs.readFileSync __dirname+'/config/default.yaml'

class Admin

  # Instantiate admin app
  constructor: (@app)->

    # Set common middleware
    MiddlewareCommon.set(@app)

    # Set routes on admin
    route = new Route
    route.assign(@app, params.endpoint, routes, params)

module.exports = Admin