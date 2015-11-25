Controller = require '../lib/controller'

class PostController extends Controller

  some: (req, res)->
    res.render 'post/preview',
      link: 'post'

exports = module.exports = PostController

exports['@require'] = [__dirname+'/default']
