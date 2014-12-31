var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function () {
    gulp.watch([
        config.src + '**/*.styl'
    ], ['styl']);
    gulp.watch([
        config.src + '**/*.js',
        config.src + '**/*.jsx',
        './config.js'
    ], ['react']);
});