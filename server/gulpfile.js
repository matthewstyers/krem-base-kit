var foreverMonitor = require('forever-monitor');
var gulp = require('gulp');
var install = require('gulp-install');
var jade = require('gulp-jade');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var path = require('path');
var plumber = require('gulp-plumber');

var config = require(path.resolve('./config'));
// single reference point for all relevant paths.
/*
NOTE: Use paths to limit the number of files being watched by any single stream.
Requiring streams to poll irrelevant files will eat up CPU useage, and if
legacyWatch is enabled within nodemon, can block the event loop.
*/
var paths = {
  'all': './**/*.js',
  'dump': './tmp',
  'keystone': './keystone/**/*',
  'package': './package.json',
  'src': ['models/**/*.js', 'routes/**/*.js', 'app.js', 'package.json'],
  'static': './templates/**/*.jade'
};

// any child processes that need to be run (particularly within nodemon) that
// don't need a standalone gulp task
var subProcess = {
  // filepaths that need some update on change but don't require a full restart
  watch: function() {
    console.log('Gulp is now watching static files.');
    process.stdout.setMaxListeners(Infinity);
    // watch static file dirs (templates, images, etc.) and do a simple page
    //reload on change
    gulp.watch(paths.static, ['reload']);
  }
};

// checks the node_modules dir for differences from the current package.json
// and runs an npm install when differences are found
gulp.task('install', function() {
  gulp.src(paths.package)
    .pipe(plumber())
    // NOTE: currently points to a node_modules dir in the parent.
    // a 'typical' confiruation would would use './'
    .pipe(gulp.dest('../'))
    .pipe(install({
      ignoreScripts: true
    }));
});
/*
NOTE: the install task is async on purpose. If it's run synchronously, it slows
the build/restart process dramatically due to npm's post-install checks that take
several seconds.

If a large install occurs when nodemon starts, the app may crash with a
'module not found' error. If this occurs, just wait for install to print
'npm info is okay' and then emit a restart by simply touching any file nodemon
is watching.
*/

// reads the the source javascript and return a report of any errors.
gulp.task('lint', function() {
  var stream = gulp.src(paths.src)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter(jshintReporter));
  return stream;
});

// simple page refresh
gulp.task('reload', function() {
  return livereload.reload();
});

gulp.task('forever', function() {
  return forever();
});

function forever() {
  var child = new (foreverMonitor.Monitor)('app.js', {
    'silent': false,
    'spinSleepTime': 100,
    'watch': false
  });
  return child.start();
}

gulp.task('nodemon', function() {
  // start the livereload server.
  livereload.listen();

  nodemon({
    script: 'app.js',
    watch: paths.src,
    legacyWatch: true,
    ext: 'js json',
    tasks: function(changedFiles) {
      console.log('file changed');
      var tasks = [];
      changedFiles.forEach(function(file) {
        if (path.extname(file) === '.js') {
          tasks.push('lint');
        }
        if (path.extname(file) === '.json') {
          tasks.push('install');
        }
      });
      return tasks;
    }
  })
    .on('start', function() {
      // start the child watch processes. also runs on restart.
      subProcess.watch();
    })
    .on('readable', function() {
      // On start/restart, watit til stdout and stdin streams are ready,
      // test to see if  livereload is listening, and then fire a page reload.
      this.stdout.on('data', function(chunk) {
        if (/^listening/.test(chunk)) {
          livereload.reload();
        }
        process.stdout.write(chunk);
      });
    });
});


// default task (also the command Docker passes when the container starts,
// so DON'T REMOVE IT.)
if (process.env.NODE_ENV === 'development') {
  gulp.task('default', ['lint', 'nodemon']);
} else {
  gulp.task('default', ['forever']);
}
