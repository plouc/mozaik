var gulp      = require('gulp');
var path      = require('path');
var stylus    = require('gulp-stylus');
var gutil     = require('gulp-util');
var chalk     = require('chalk');
var config    = require('../config');
var appConfig = require(path.join(config.root, 'config.js'));

gulp.task('styl', ['collect:styl'], function () {
    gutil.log(chalk.green('Compiling stylus code using theme \'' + appConfig.theme + '\''));

    return gulp
        .src(config.mozaikLib + 'styl/mozaik.styl')
        .pipe(stylus({
            'include css': true,
            use: function (style) {
                style.define('$theme', appConfig.theme);
            }
        }))
        .pipe(gulp.dest(config.dest + 'css'))
    ;
});