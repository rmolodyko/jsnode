express = require 'express'

# Used for resolving routes and controllers
class Route

  constructor: (@di)->

  # Assign routers on map
  assign: (app, map, routes, params)=>

    # Iterate and set all routes
    for routeName, route of routes
      # Use closure for storing data between iterations
      do (routeName, route, app)=>
        # Get router
        router = express.Router()
        # Get url of route
        url = "#{route.route}"
        # Get method for route
        method = if route.method? then route.method else 'all'
        # Set callback when route will be called
        router[method] url, (req, res)=>
          # Get and instantiate class, use di for this
          controller = @di.create __dirname + "/../../"+ params['controller-path'] + route.controller
          # Call render
          # TODO maybe need di for passing arguments to action method
          controller[route.action](req, res)

        # Assign router on map
        app.use "#{map}", router

exports = module.exports = Route

exports['@require'] = [__dirname+'/../di']

