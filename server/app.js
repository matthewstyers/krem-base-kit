var cluster = require('cluster');
var keystone = require('keystone');

// pull config object based on NODE_ENV environment variable
var config = require('./config');

keystone.init({
  'admin path': 'admin',
  'auth': true,
  'auto update': true,
  'brand': process.env.BRAND || 'BRAND',
  'favicon': 'public/favicon.ico',
  'mongo': process.env.MONGOLAB_URI,
  'name': process.env.PROJECT_NAME || 'PROJECT_NAME',
  'port': process.env.PORT || 5000,
  'session store': 'connect-mongo',
  'session': true,
  'static': ['public'],
  'user model': 'User',
  'view engine': 'jade',
  'views': 'templates/views'
});

keystone.import('models');

keystone.set({
  'app config': config,
  'google api key': process.env.GOOGLE_BROWSER_API_KEY || undefined,
  'google server api key': process.env.GOOGLE_SERVER_API_KEY || undefined,
  'locals': {
    _: require('lodash'),
    env: keystone.get('env'),
    utils: keystone.utils,
    editable: keystone.content.editable
  },
  'nav': {
    'inquiries': 'inquiries',
    'users': ['users']
  },
  'routes': require('./routes'),
});

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
