Controller = require '../lib/controller'

class DefaultController extends Controller

  render: (req, res)->
    res.render 'layout',
      link: 'default'

module.exports = DefaultController