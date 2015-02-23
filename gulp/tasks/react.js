var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var config     = require('../config');


gulp.task('react', ['collect:js'], function () {
    var bundler = browserify(config.src + 'App.jsx', {
        debug: !config.isProduction()
    });

    bundler.transform(reactify, {
        es6: true
    });

    var rebundle = function () {
        var stream = bundler.bundle();
        stream = stream.pipe(source('mozaik.js'));

        return stream.pipe(gulp.dest(config.dest));
    };

    bundler.on('update', rebundle);

    return rebundle();
});