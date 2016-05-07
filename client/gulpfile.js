/* eslint-disable */
/*
This gulpfile was written with the primary goal of automating any task
that might require one to restart a Docker container running a
React/Redux development server.

It's been commented extensively because gulpfiles can get weird
and hard to follow.
*/
// var foreverMonitor = require('forever-monitor');
var gulp = require('gulp');
var install = require('gulp-install');
var named = require('vinyl-named');
var nodemon = require('gulp-nodemon');
var path = require('path');
var plumber = require('gulp-plumber');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config').production;
// single reference point for all relevant paths.
/*
NOTE: Use paths to limit the number of files being watched by any single stream.
Requiring streams to poll irrelevant files will eat up CPU useage, and if
legacyWatch is enabled within nodemon, can block the event loop.
*/
var paths = {
  'client': {
    dist: './public/dist/',
    entry: path.resolve('./src/app.js'),
    src: ['./src/**/*.js', './src/**/*.jsx']
  },
  'package': './package.json',
  'server': 'server.js',
  'webpackConfig': 'webpack.config.js'
};

// any child processes that need to be run (particularly within nodemon) that
// don't need a standalone gulp task
var subProcess = {
  // filepaths that need some update on change but don't require a full restart
  watch: function() {
    console.log('Gulp is now watching static files.');
    // runs a webpack build whenever a file changes
    // gulp.watch(paths.webpackConfig, ['forever']);
    gulp.watch(paths.package, ['install']);
  }
};

gulp.task('build', function() {
  return gulp.src(webpackConfig.entry.app)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack(webpackConfig, null, function(err, stats) {
      console.log(stats.toString());
    }))
    .pipe(gulp.dest(paths.client.dist))
    .on('end', function(err) {
      if (err) cb(err);
    });
});

gulp.task('nodemon', function() {
  // start the livereload server.
  nodemon({
    script: 'server.js',
    watch: [paths.server, paths.webpackConfig],
    legacyWatch: true,
    tasks: function(changedFiles) {
      console.log('file changed');
      var tasks = [];
      changedFiles.forEach(function(file) {
        if (path.extname(file) === '.js' || '.config.js') {
          tasks.push('justRestartBro');
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


// checks the node_modules dir for differences from the current package.json
// and runs an npm install when differences are found
gulp.task('install', function() {
  gulp.src(paths.package)
    .pipe(plumber())
    // NOTE: currently points to a node_modules dir in the parent.
    // a 'typical' confiruation would would use './'
    .pipe(gulp.dest('/app'))
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

gulp.task('justRestartBro', function() {
  return;
});


gulp.task('watch', function() {
  return subProcess.watch();
});

// default task (also the command Docker passes when the container starts,
// so DON'T REMOVE IT.)
gulp.task('default', ['nodemon']);
