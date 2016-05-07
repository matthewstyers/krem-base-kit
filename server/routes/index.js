var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var rest = require('restful-keystone')(keystone, {
  root: '/api/v1'
});

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.initNav, middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function(app) {
  // Views
  app.get('/', routes.views.index);
// rest.expose({}).start();
};
