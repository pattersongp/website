'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer');

var input = './scss/**/*.scss';
var main = './scss/styles.scss';
var output = './assets/css/';
var scssOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}

gulp.task('compile-scss', function(){
  return gulp
    .src(main)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

gulp.task( 'watch-scss', function() {
  gulp.watch( input , ['compile-scss'] );
});

gulp.task('default', ['compile-scss', 'watch-scss']);
