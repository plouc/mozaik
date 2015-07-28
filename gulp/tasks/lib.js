var gulp       = require('gulp');
var del        = require('del');
var rename     = require('gulp-rename');
var toFive     = require("gulp-6to5");
var plumber    = require('gulp-plumber');
var replace    = require('gulp-regex-replace');
var stripDebug = require('gulp-strip-debug');

gulp.task('lib-clean', function (cb) {
    del('./lib', cb);
});

gulp.task('lib-copy', function () {
    return gulp.src([
            './src/**/*.html',
            './src/**/*.styl'
        ])
        .pipe(gulp.dest('./lib'))
    ;
});

gulp.task('lib-compile', function () {
    return gulp.src([
            './src/**/*.js',
            './src/**/*.jsx'
        ])
        .pipe(plumber())
        .pipe(toFive({}))
        .pipe(replace({regex: "\\.jsx", replace: ''}))
        .pipe(rename({ extname: '.js' }))
        //.pipe(stripDebug())
        .pipe(gulp.dest('./lib'))
    ;
});


gulp.task('lib', ['lib-copy', 'lib-compile']);