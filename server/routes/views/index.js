var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  res.locals.scriptSrc = process.env.NODE_ENV === 'development' ?
    `http://${process.env.DOCKER_MACHINE_IP}:8080/bundle.js` :
    // `http://${process.env.HOST}/dist/bundle.js`
    'https://s3-us-west-2.amazonaws.com/new-line-properties/static-assets/bundle.js';
  // Render the view
  view.render('index');

};
