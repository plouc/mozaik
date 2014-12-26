var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var config     = require('../config');


gulp.task('react', ['collect:js'], function () {
    return browserify(config.src + 'App.jsx')
        .transform(reactify)
        .bundle()
        .pipe(source('mozaik.js'))
        .pipe(gulp.dest(config.dest))
    ;
});