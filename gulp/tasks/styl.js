var gulp   = require('gulp');
var path   = require('path');
var stylus = require('gulp-stylus');
var fs     = require('fs');
var gutil  = require('gulp-util');
var chalk  = require('chalk');
var config = require('../config');

gulp.task('styl', ['collect:styl'], function (done) {
    var appConfig = require(path.join(config.root, 'config.js'));
    var theme = appConfig.theme;

    var mozaikThemePath = config.mozaikLib + path.join('themes', theme);
    var customThemePath = config.root + path.join('themes', theme);

    if (fs.existsSync(customThemePath)) {
        theme = customThemePath;
    } else if (fs.existsSync(mozaikThemePath)) {
        theme = mozaikThemePath;
    }

    gutil.log(chalk.green('Compiling stylus code using theme \'' + theme + '\''));

    return gulp
        .src(config.mozaikLib + 'styl/mozaik.styl')
        .pipe(stylus({
            'include css': true,
            use: function (style) {
                style.define('$theme', theme);
            }
        }))
        .pipe(gulp.dest(config.dest + 'css'))
    ;
});