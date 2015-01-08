var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var _      = require('lodash');
var rename = require('gulp-rename');
var config = require('../config');

gulp.task('js:min', ['react'], function () {
    return gulp.src(config.dest + '/mozaik.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dest))
    ;
});