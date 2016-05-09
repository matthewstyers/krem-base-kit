var _ = require('lodash');
var keystone = require('keystone');

/**
	Initialises the standard view locals
*/

exports.initLocals = function(req, res, next) {

  var locals = res.locals;

  locals.tenet = req.session.tenet || req.tenet || null;
  locals.user = req.user;
  locals.brand = keystone.get('brand');
  next();

};

exports.initNav = function(req, res, next) {

  var locals = res.locals;
  locals.brand = keystone.get('brand');
  next();
};

/*
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.filter(flashMessages, function(msgs) {
    return msgs.length;
  }) ? flashMessages : false;

  next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect(`/${keystone.get('admin path')}/signin`);
  } else {
    next();
  }

};
