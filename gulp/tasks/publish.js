var gulp = require('gulp');

gulp.task('publish', ['copy', 'styl', 'js:min']);