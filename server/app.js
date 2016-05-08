var cluster = require('cluster');
var keystone = require('keystone');

// pull config object based on NODE_ENV environment variable
var config = require('./config');

keystone.init({
  'admin path': 'admin',
  'auth': true,
  'auto update': true,
  'brand': config.brand,
  'favicon': 'public/favicon.ico',
  'mongo': config.mongo,
  'name': config.projectName,
  'port': config.port,
  'session store': 'connect-mongo',
  'session': true,
  'static': ['public'],
  'user model': 'User',
  'view engine': 'jade',
  'views': 'templates/views'
});

keystone.import('models');

keystone.set('nav', {
  'inquiries': 'inquiries',
  'users': ['users']
});

keystone.set('app config', config);
keystone.set('google api key', process.env.GOOGLE_BROWSER_API_KEY || undefined);
keystone.set('google server api key', process.env.GOOGLE_SERVER_API_KEY || undefined);
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

keystone.set('routes', require('./routes'));

function startApp() {
  keystone.start({
    onMount: function() {
      if (process.env.NODE_ENV === 'development') {
        keystone.app.use(require('connect-livereload')());
      }
    }
  });
}

// when set, starts multiple instances of the app for rolling restarts.
if (config.cluster) {
  if (cluster.isMaster) {
    var numWorkers = config.maxClusterThreads ?
      config.maxClusterThreads : require('os').cpus().length;

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
