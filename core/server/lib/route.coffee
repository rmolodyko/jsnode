express = require 'express'

# Used for resolving routes and controllers
#TODO Add Dependency Injection to controller
class Route

  # Assign routers on map
  assign: (app, map, routes, params)=>
    # Iterate and set all routes
    for routeName, route of routes
      # Use closure for storing data between iterations
      do (routeName, route, app)->
        # Get router
        router = express.Router()
        # Get url of route
        url = "#{route.route}"
        # Get method for route
        method = if route.method? then route.method else 'all'
        # Set callback when route will be called
        router[method] url, (req, res)->
          # Get class
          classController = require(__dirname + "/.."+ params['controller-path'] + route.controller)
          # Instantiate controller
          controller = new classController
          # Save request and response
          controller.set req, res
          # Call render
          do controller[route.action]

        # Assign router on map
        app.use "#{map}", router

module.exports = Route
