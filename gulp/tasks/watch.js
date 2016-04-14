var gulp   = require('gulp');
var path   = require('path');
var config = require('../config');


gulp.task('watch:styles', function () {
    return gulp.watch([
        config.root      + path.join('config.js'),                                      // config for `theme` property
        config.mozaikSrc + path.join('styl', '**', '*'),                                // mozaïk base styles
        config.mozaikSrc + path.join('themes', '**', '*'),                              // mozaïk themes
        config.root      + path.join('themes', '**', '*'),                              // custom themes
        config.root      + path.join('node_modules', 'mozaik-ext-*', 'styl', '**', '*') // extensions styles
    ], ['styles:dev']);
});


gulp.task('watch', ['watch:styles', 'watch:js']);
