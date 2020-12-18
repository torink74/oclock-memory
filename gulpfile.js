'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const { gulpSassError } = require('gulp-sass-error');
var notify = require("gulp-notify");
const throwError = true;
sass.compiler = require('node-sass');

gulp.task('style', function () {
    return gulp.src('./app/assets/src/scss/**/*.scss')
        .pipe(sass({
                outputStyle: 'compressed'
            })
                .on('error', function(err) {
                    gulpSassError(throwError);
                    this.emit('end');
                    return notify().write(err);
                })
        )
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('styles.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/assets/dist/css'));
});

gulp.task('default', function () {
    gulp.watch('./app/assets/src/scss/**/*.scss', gulp.series('style'));
});