var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', function () {
    gulp.watch([
        config.src + '**/*.scss'
    ], ['sass']);
    gulp.watch([
        config.src + '**/*.js',
        config.src + '**/*.jsx',
        './config.js'
    ], ['react']);
});