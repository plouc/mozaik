var gulp    = require('gulp');
var config  = require('../config');
var gutil   = require('gulp-util');
var flatten = require('gulp-flatten');
var chalk   = require('chalk');

var fontsPaths = [
    config.mozaikRoot + 'node_modules/font-awesome/fonts/*',
    config.root + 'node_modules/mozaik-ext-*/assets/fonts/*',
    config.root + 'themes/*/assets/fonts/*',
    config.mozaikSrc + 'themes/*/assets/fonts/*'
];

gulp.task('copy:fonts', function () {
    gutil.log(chalk.green('Copying fonts'));

    return gulp.src(fontsPaths)
        .pipe(flatten())
        .pipe(gulp.dest(config.dest + 'fonts'))
    ;
});

gulp.task('copy:imgs', function () {
    gutil.log(chalk.green('Copying images from extensions and themes'));

    return gulp.src([
            config.root + 'node_modules/mozaik-ext-*/assets/imgs/*',
            config.root + 'themes/*/assets/imgs/*',
            config.mozaikSrc + 'themes/*/assets/imgs/*'
        ])
        .pipe(flatten())
        .pipe(gulp.dest(config.dest + 'imgs'))
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

gulp.task('copy', ['copy:fonts', 'copy:styles', 'copy:imgs']);