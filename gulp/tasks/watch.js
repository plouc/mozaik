var gulp   = require('gulp');
var path   = require('path');
var config = require('../config');



gulp.task('watch:styl', function () {
    var appConfig = require(path.join(config.root, 'config.js'));
    var theme     = appConfig.theme;

    return gulp.watch([
        config.mozaikLib + path.join('styl', '**', '*'),                           // mozaïk base styles
        config.mozaikLib + path.join('themes', theme, '**', '*'),                  // mozaïk themes
        config.root + path.join('themes', theme, '**', '*'),                       // custom themes
        config.root + path.join('node_modules', 'mozaik-ext-*', 'styl', '**', '*') // extensions styles
    ], ['styl']);
});

gulp.task('watch', function () {
    gulp.watch([
        config.src + '**/*.js',
        config.src + '**/*.jsx',
        './config.js'
    ], ['js:min']);
});