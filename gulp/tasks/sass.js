var gulp   = require('gulp');
var sass   = require('gulp-ruby-sass');
var config = require('../config');


gulp.task('sass', ['collect:sass'], function () {
    return gulp
        .src(config.src + 'core/scss/hotboard.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.dest))
    ;
});