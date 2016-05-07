// var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var locals = res.locals;
	locals.spaces = [];
	locals.portfolio = {};

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.tenet = null;
  req.session.tenet = null;
  res.redirect('/tenets');
};
