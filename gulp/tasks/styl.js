var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var gutil  = require('gulp-util');
var chalk  = require('chalk');
var config = require('../config');

gulp.task('styl', ['collect:styl'], function () {
    gutil.log(chalk.green('Compiling stylus code'));

    return gulp
        .src(config.mozaikSrc + 'core/styl/mozaik.styl')
        .pipe(stylus({
            use: function (style) {
                style.define('$theme', 'night-blue');
            }
        }))
        .pipe(gulp.dest(config.dest))
    ;
});