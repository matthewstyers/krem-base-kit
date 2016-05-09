var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  res.locals.scriptSrc = undefined;
  view.render('index');

  res.locals.scriptSrc = process.env.NODE_ENV === 'development' ?
    `http://${process.env.DOCKER_MACHINE_IP}:8080/bundle.js` :
    undefined;
};
