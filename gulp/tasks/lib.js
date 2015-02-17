var gulp         = require('gulp')
    , del        = require('del')
    , rename     = require('gulp-rename')
    , toFive     = require("gulp-6to5")
    , plumber    = require('gulp-plumber')
    , replace    = require('gulp-regex-replace')
    , stripDebug = require('gulp-strip-debug');

gulp.task('lib-clean', function (cb) {
    del('./lib', cb);
});

gulp.task('lib-copy', function () {
    return gulp.src([
            './src/**/*.html'
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
        .pipe(stripDebug())
        .pipe(gulp.dest('./lib'))
    ;
});


gulp.task('lib', ['lib-copy', 'lib-compile']);