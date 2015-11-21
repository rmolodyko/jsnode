Controller = require '../lib/controller'

class DefaultController extends Controller

  render: ()->
    @res.render 'layout',
      link: 'default'

module.exports = DefaultController