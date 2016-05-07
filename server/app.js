var cluster = require('cluster');
var keystone = require('keystone');

// pull config object based on NODE_ENV environment variable
var config = require('./config')[process.env.NODE_ENV];

keystone.init({
  'admin path': 'admin',
  'auth': true,
  'auto update': true,
  'brand': 'New Line Properties',
  'emails': 'templates/emails',
  'favicon': 'client/public/favicon.ico',
  'mongo': process.env.MONGOLAB_URI,
  'name': 'New Line Properties',
  'port': process.env.PORT || 5000,
  'session store': 'connect-mongo',
  'session': true,
  'static': ['public', '/app/client/public'],
  'user model': 'User',
  'view engine': 'jade',
  'views': 'templates/views'
});

keystone.set('app config', config);

keystone.import('models');

keystone.set('locals', {
  _: require('underscore'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));
keystone.set('homepage gallery', 'homepage-portfolio');

keystone.set('nav', {
  'inquiries': 'inquiries',
  'users': ['users'],
  'listings': ['suites', 'properties', 'regions'],
  'tenets': ['tenets', 'work-orders'],
  'media': 'galleries'
});

keystone.set('google api key', process.env.GOOGLE_BROWSER_API_KEY);
keystone.set('google server api key', process.env.GOOGLE_SERVER_API_KEY);


function startApp() {
  keystone.start({
    onMount: function() {
      if (process.env.NODE_ENV === 'development') {
        keystone.app.use(require('connect-livereload')());
      }
    }
  });
}

if (config.server.cluster === true) {
  if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers +
      ' workers...');

    for (var i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid +
        ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else {
    startApp();
  }
} else {
  startApp();
}
