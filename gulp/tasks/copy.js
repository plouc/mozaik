var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy:fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(config.dest + 'fonts'))
    ;
});

gulp.task('copy:styles', function () {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest(config.dest))
    ;
});

gulp.task('copy', ['copy:fonts', 'copy:styles']);