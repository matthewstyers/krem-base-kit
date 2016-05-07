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
  var tenet = locals.tenet;

  if(!tenet) {
    tenet = req.session.tenet;
  }

  if (tenet) {
    locals.navLinks = [{
      label: 'Work Orders',
      key: 'work-orders',
      href: 'tenets/work-orders'
    }, {
      label: 'Pay Rent',
      key: 'rent',
      href: 'tenets/#'
    }];
  } else {
    locals.navLinks = [{
      label: 'Spaces',
      key: 'spaces',
      href: '#spaces'
    }, {
      label: 'Work',
      key: 'work',
      href: '#work'
    }, {
      label: 'About',
      key: 'about',
      href: '#about'
    }, {
      label: 'Contact',
      key: 'contact',
      href: '#contact'
    }];
  }
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
    res.redirect('/keystone/signin');
  }
  else {
    next();
  }

};
