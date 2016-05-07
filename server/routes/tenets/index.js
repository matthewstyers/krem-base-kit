var async = require('async');
var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  var form = locals.formData = req.body || {};
  locals.validationErrors = {};

  // On POST requests, add the Inquiry item to the database
  view.on('post', {
    action: 'login'
  }, function(next) {
    async.waterfall(
      [
        function(cb) {
          keystone.list('Tenet')
            .model
            .findOne(
              {
                email: form.email
              }
          )
            .populate('suites')
            .exec(function(err, tenet) {
              if (!tenet) {
                async.setImmediate(function() {
                  req.flash('error',
                    'We can\'t find a tenet with that email address. Try again?');
                  next();
                });
              } else {
                cb(err, tenet);
              }
            });
        },
        function(tenet, cb) {
          req.session.tenet = locals.tenet = tenet;
          tenet._.password.compare(form.password, cb);
        }
      ], function(err, result) {
        if (err) next(err);
        if (result) res.redirect('/tenets');
      }
    );
  });
  view.render('tenets/dashboard');
};
