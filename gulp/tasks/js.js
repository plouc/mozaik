var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var rename     = require('gulp-rename');
var watchify   = require('watchify');
var browserify = require('browserify');
var babelify   = require('babelify');
var gutil      = require('gulp-util');
var chalk      = require('chalk');
var config     = require('../config');


function getBundler(isDev) {
    var bundler = browserify({
        entries:      [config.src + 'App.jsx'],
        extensions:   ['.js', '.jsx'],
        debug:        isDev,
        cache:        {},  // for watchify
        packageCache: {},  // for watchify
        fullPaths:    true // for watchify
    });

    bundler.transform(babelify, {
    });

    return bundler;
}

gulp.task('watch:js', function () {
    var watcher = watchify(getBundler(true));

    return watcher
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .on('update', function () {
            watcher.bundle()
                .pipe(source('mozaik.js'))
                .pipe(gulp.dest(config.dest))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(config.dest))
            ;

            gutil.log(chalk.green('Updated JavaScript sources'));
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest(config.dest))
    ;
});

gulp.task('watch:js:dev', function () {
    var watcher = watchify(getBundler(true));

    return watcher
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .on('update', function () {
            watcher.bundle()
                .pipe(source('mozaik.js'))
                .pipe(buffer())
                .pipe(gulp.dest(config.dest))
            ;

            gutil.log(chalk.green('Updated JavaScript sources [dev]'));
        })
        .bundle() // Create the initial bundle when starting the task
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
    ;
});


gulp.task('js:dev', function () {
    return getBundler(true)
        .bundle()
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
    ;
});


gulp.task('js', ['js:dev'], function () {
    return gulp.src(config.dest + '/mozaik.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dest))
    ;
});