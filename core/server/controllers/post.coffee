Controller = require '../lib/controller'

class PostController extends Controller

  constructor: (@fs, @Post)->

  posts: (req, res)->
    @Post.find {}, (err, data)->
      res.render 'post/list',
        link: 'post',
        list: data

  addPost: (req, res)->
    if not req.body.id?
      post = new @Post
        name: req.body.name
        content: req.body.content
      post.save (err)->
        if err
          res.send
            status: 0
        res.send
          status: 1
    else
      @Post.update
        _id: req.body.id,
          name: req.body.name
          content: req.body.content
        (err, numAffected)->
          if err
            res.send
              status: 2
          res.send
            status: 3

  getPost: (req, res)->
    @Post.findById req.params.id, (err, data)->
      res.render 'post/preview',
        link: 'post'
        post: data

exports = module.exports = PostController

exports['@require'] = [
  {path: 'fs', instantiate: false}
  {path: __dirname + '/../models/post', instantiate: false}
]
