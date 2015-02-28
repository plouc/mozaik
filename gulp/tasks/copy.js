var gulp    = require('gulp');
var config  = require('../config');
var gutil   = require('gulp-util');
var flatten = require('gulp-flatten');
var chalk   = require('chalk');

gulp.task('copy:fonts', function () {
    gutil.log(chalk.green('Copying fonts'));

    return gulp.src([
            config.mozaikRoot + 'node_modules/font-awesome/fonts/*',
            config.root + 'node_modules/mozaik-ext-*/assets/fonts/*'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(config.dest + 'fonts'))
    ;
});

gulp.task('copy:styles', function () {
    gutil.log(chalk.green('Copying styles'));

    return gulp.src([
            config.mozaikRoot + 'node_modules/font-awesome/css/font-awesome.min.css'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(config.dest + 'css'))
    ;
});

gulp.task('copy', ['copy:fonts', 'copy:styles']);