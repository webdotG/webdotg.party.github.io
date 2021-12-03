var gulp = require('gulp');

gulp.task('move', function () {
   gulp.src('css/*.css')
       .pipe(gulp.dest('demo/css/'));
});

