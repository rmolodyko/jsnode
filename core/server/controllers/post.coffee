Controller = require '../lib/controller'

class PostController extends Controller

  constructor: (@fs)->

  some: (req, res)->
    @fs.readFile 'readme.md', 'utf8', (err, data)=>
      res.render 'post/preview',
        link: 'post',
        sample: data

exports = module.exports = PostController

exports['@require'] = [{path: 'fs', instantiate: false}]
