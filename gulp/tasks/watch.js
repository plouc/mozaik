var gulp   = require('gulp');
var path   = require('path');
var config = require('../config');

function stylesWatcher(devMode) {
    var appConfig = require(path.join(config.root, 'config.js'));
    var theme     = appConfig.theme;
    var task      = devMode ? 'styles:dev' : 'styles';

    return gulp.watch([
        config.mozaikSrc + path.join('styl', '**', '*'),                           // mozaïk base styles
        config.mozaikSrc + path.join('themes', theme, '**', '*'),                  // mozaïk themes
        config.root + path.join('themes', theme, '**', '*'),                       // custom themes
        config.root + path.join('node_modules', 'mozaik-ext-*', 'styl', '**', '*') // extensions styles
    ], [task]);
}

gulp.task('watch:styles:dev', function () {
    return stylesWatcher(true);
});


gulp.task('watch:styles', function () {
    return stylesWatcher(false);
});


gulp.task('watch:dev', ['watch:styles:dev', 'watch:js:dev']);
gulp.task('watch',     ['watch:styles',     'watch:js']);