
###
  Class Dependency injection
  Can load and instantiate need modules

  If module have to has some depends then it need add annotation @require
  Example:
    exports['@require'] = [__dirname+'/path/to/module1', __dirname+'/path/to/module2']
  * The value have to be array and in path need use absolute path[with __dirname constant]

  If module need instantiate only one time then it need add annotation @singleton
  Example:
    exports['@singleton'] = true|false

  If module need pass some additional params for example ?instantiate then in @require annotation
  have to pass object as item with this ones
  Example:
    exports['@require'] = [{path: 'fs', instantiate: false}]
###
class DI

  @instance: null

  constructor: ()->
    @services = []

  @getInstance: ()->
    DI.instance ?= new DI

  # Instantiate class with dependencies
  create: (path, instantiate = true)->
    # Get class
    _class = require path
    # Get dependencies
    depends = _class['@require'] || []
    singleton = _class['@singleton'] || true # Default value is false
    # If this module is exists in cache(ServiceContainer) then get it
    if @_hasModule path
      instance = @_getModule(path)
    else
      # Instantiate class
      instance = @_instantiateModule _class, @_instantiateDependencies(depends), instantiate
      # If this module has singleton annotation then set and then get this module
      # without repeat instantiation of module
      if singleton is true
        @_setModule path, instance
    return instance

  # Instantiate current class
  _instantiateModule: (_class, args, instantiate)=>
    # Get correct arguments
    correctArgs = Array.prototype.concat.apply([null], args);
    # If need instantiate class
    if instantiate
      # Return new class
      return new (Function.prototype.bind.apply(_class, correctArgs))
      # If it is not a class
    else
      # Return new class
      return _class

  # Instantiate class which is dependencies of current class
  _instantiateDependencies: (depends)=>
     args = []
     # Create array with dependencies
     for i, inst of depends
       # Check if it is object then it has some additional params
       if typeof inst is 'object'
         args.push(@create inst.path, inst.instantiate)
       else
         args.push(@create inst)
     return args

  # Get instance of module from container
  _getModule: (path)=>
    if @services[path] is null
      throw new Error "Module for path #{path} not found"
    @services[path]

  # Set instance of module to container
  _setModule: (path, instance)=>
    @services[path] = instance

  # Check if module with passed path is exists in container
  _hasModule: (path)=>
    true if @services[path]?

module.exports = DI
