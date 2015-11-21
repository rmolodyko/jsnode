Controller = require '../lib/controller'

class PostController extends Controller

  some: ()->
    @res.render 'post/preview',
      link: 'post'

module.exports = PostController
