'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const minifyJS = require('gulp-minify');
const { gulpSassError } = require('gulp-sass-error');
var notify = require("gulp-notify");
const throwError = true;
sass.compiler = require('node-sass');

// Minifies and concatenates JS
gulp.task('script', function(){
    return gulp.src('./app/assets/src/js/**/*.js')
        .pipe(minifyJS({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js']
        }))
        .pipe(gulp.dest('./app/assets/dist/js'))
});

// Minifies and concatenates CSS
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
    gulp.watch('./app/assets/src/js/**/*.js', gulp.series('script'));
    gulp.watch('./app/assets/src/scss/**/*.scss', gulp.series('style'));
});