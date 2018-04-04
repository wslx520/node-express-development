const gulp = require('gulp');
// it's gulp-mocha here, not 'mocha'
const mocha = require('gulp-mocha');
const log = require('fancy-log');

gulp.task('mocha', function () {
    return gulp.src(
            ['qa/*.js'], {
                read: false
            })
        .pipe(mocha({
            reporter: 'spec',
            ui: 'tdd',
            timeout: 10000
        }))
        .on('error', log);
});