var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var rename      = require('gulp-rename');
var watchify    = require('watchify');
var browserify  = require('browserify');
var resolutions = require('browserify-resolutions');
var babelify    = require('babelify');
var gutil       = require('gulp-util');
var chalk       = require('chalk');
var _           = require('lodash');
var config      = require('../config');


function getBundler(isDev) {
    var opts = _.assign({}, watchify.args, {
        entries:    [config.src + 'App.jsx'],
        extensions: ['.js', '.jsx'],
        debug:      isDev,
        fullPaths:  isDev
    });

    return browserify(opts)
        .plugin(resolutions, [
            'react',
            'mozaik',
            'lodash',
            'react-mixin',
            'convict',
            'd3',
            'classnames',
            'bluebird',
            'moment'
        ])
        .transform(babelify, { presets: ['es2015', 'react'] })
    ;
}

function bundle(bundler, isDev) {
    var b = bundler
        .bundle()
        .on('error', function (err) {
            gutil.log(chalk.red(err));
        })
        .pipe(source('mozaik.js'))
        .pipe(buffer())
        .pipe(gulp.dest(config.dest))
    ;

    if (!isDev) {
        b = b
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(config.dest))
        ;
    }

    return b;
}

function getWatcher(isDev) {
    var watcher = watchify(getBundler(true));

    return watcher
        .on('log', gutil.log)
        .on('update', function (files) {
            gutil.log(chalk.yellow('Updated JavaScript sources, changes in:'));
            files.forEach(function (file) {
                gutil.log('- ' + file);
            });

            return bundle(watcher, isDev);
        })
    ;
}

gulp.task('watch:js', function () {
    return bundle(getWatcher(true), true)
        .on('end', function () {
            gutil.log(chalk.yellow('watch:js watcher ready'));
        })
    ;
});


gulp.task('js:dev', function () {
    return getBundler(true)
        .bundle()
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
    ;
});


gulp.task('js', function () {
    process.env.NODE_ENV = 'production';

    return getBundler(false)
        .bundle()
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dest))
    ;
});