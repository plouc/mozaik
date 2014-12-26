var gulp   = require('gulp');
var config = require('../config');

gulp.task('copy', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest(config.dest + 'fonts'))
    ;
});