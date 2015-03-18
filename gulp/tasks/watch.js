var gulp        = require('gulp');
var gutil       = require('gulp-util');
var path        = require('path');
var runSequence = require('run-sequence');
var FindFile    = require('find-file');
var chalk       = require('chalk');
var _           = require('lodash');
var config      = require('../config');


function stylesWatcher(devMode) {
    var appConfig = require(path.join(config.root, 'config.js'));
    var theme     = appConfig.theme;
    var task      = devMode ? 'styles:dev' : 'styles';

    return gulp.watch([
        config.mozaikLib + path.join('styl', '**', '*'),                           // mozaïk base styles
        config.mozaikLib + path.join('themes', theme, '**', '*'),                  // mozaïk themes
        config.root + path.join('themes', theme, '**', '*'),                       // custom themes
        config.root + path.join('node_modules', 'mozaik-ext-*', 'styl', '**', '*') // extensions styles
    ], [task]);
}

function extWatcher() {
    // Detect changes in extension and build the lib for it
    return gulp.watch(
        config.root + path.join('node_modules', 'mozaik-ext-*', 'src', '**', '*'),
        changeHandler
    );

    function changeHandler(event) {
        gutil.log(chalk.blue('Detected change in', path.basename(event.path)));

        // Find the gulpfile.js from extension folder
        var eventDir = path.dirname(event.path);
        var find = new FindFile()
            .name('gulpfile.js')
            .where([path.join(eventDir, '../'), path.join(eventDir, '../../')]);

        find.run(function(err, files) {
            if (err || files.length === 0) {
                return;
            }

            var gulpFilePath = files[0].path;
            var extGulp = require(gulpFilePath);
            var extName = path.basename(path.dirname(gulpFilePath));

            if (_.isEmpty(extGulp)) {
                gutil.log(chalk.red('Extension', extName, 'gulpfile.js does not export gulp'));
                gutil.log(chalk.red('Please add "module.exports = gulp;" to fix the issue'));
                return;
            }

            gutil.log(chalk.green('Building', extName));
            process.chdir(path.dirname(gulpFilePath));

            // Run the gulp task
            runSequence.use(extGulp)('lib-clean', 'lib-compile');
        });
    };
}

gulp.task('watch:ext', function () {
    return extWatcher();
});


gulp.task('watch:styles:dev', function () {
    return stylesWatcher(true);
});


gulp.task('watch:styles', function () {
    return stylesWatcher(false);
});


gulp.task('watch:dev', ['watch:styles:dev', 'watch:js:dev']);
gulp.task('watch',     ['watch:styles',     'watch:js']);