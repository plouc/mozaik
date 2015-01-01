var gulp      = require('gulp');
var stylus    = require('gulp-stylus');
var config    = require('../config');

gulp.task('styl', ['collect:styl'], function () {

    var appConfig = require('../../config');

    return gulp
        .src(config.src + 'core/styl/mozaik.styl')
        .pipe(stylus({
            use: function (style) {
                style.define('$theme', appConfig.theme);
            }
        }))
        .pipe(gulp.dest(config.dest))
    ;
});