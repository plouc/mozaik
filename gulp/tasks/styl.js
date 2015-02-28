var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var gutil  = require('gulp-util');
var chalk  = require('chalk');
var config = require('../config');

gulp.task('styl', ['collect:styl'], function () {
    gutil.log(chalk.green('Compiling stylus code'));

    return gulp
        .src(config.mozaikLib + 'styl/mozaik.styl')
        .pipe(stylus({
            'include css': true,
            use: function (style) {
                style.define('$theme', 'night-blue');
            }
        }))
        .pipe(gulp.dest(config.dest + 'css'))
    ;
});