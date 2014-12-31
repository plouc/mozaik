var gulp   = require('gulp');
var stylus = require('gulp-stylus');
var config = require('../config');


gulp.task('styl', ['collect:styl'], function () {
    return gulp
        .src(config.src + 'core/styl/mozaik.styl')
        .pipe(stylus())
        .pipe(gulp.dest(config.dest))
    ;
});