var gulp   = require('gulp');
var config = require('../config');
var gutil  = require('gulp-util');
var chalk  = require('chalk');

gulp.task('copy:fonts', function () {
    gutil.log(chalk.green('Copying fonts'));

    return gulp.src([
            './node_modules/font-awesome/fonts/*',
            config.src + 'ext/weather/assets/fonts/*'
        ])
        .pipe(gulp.dest(config.dest + 'fonts'))
    ;
});

gulp.task('copy:styles', function () {
    gutil.log(chalk.green('Copying styles'));

    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(config.dest))
    ;
});

gulp.task('copy', ['copy:fonts', 'copy:styles']);