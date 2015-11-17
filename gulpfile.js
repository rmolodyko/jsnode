/**
 * Created by rmolodyko on 17.11.2015.
 */

// Include some modules
var gulp = require('gulp');
var jade = require('gulp-jade');
var rm = require('gulp-rimraf');
var stylus = require('gulp-stylus');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var livereload = require('gulp-livereload');

/**
 * Remove all resources before compilation
 */
gulp.task('clean', function() {
    return gulp.src('./dist/html', { read: false })
        .pipe(rm());
});

/**
 * Task to compile jade files
 */
gulp.task('jade', function() {

    // Compile all files in templates folder
    gulp.src('./client/jade/templates/*')
        .pipe(jade())
        .pipe(gulp.dest('./dist/html'));

    // Compile main jade/html file
    gulp.src('./client/jade/index.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist'));
});

/**
 * Task to compile styl files
 */
gulp.task('stylus', function () {
    gulp.src('./client/stylus/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dist/css'));
});

/**
 * Task to compile coffee script files
 */
gulp.task('coffee', function() {
    gulp.src('./client/coffee/*')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./dist/js'));
});

/**
 * Task to move javascript files
 */
gulp.task('move-js', function() {
    gulp.src('./client/js/*')
        .pipe(gulp.dest('./dist/js'));
});

/**
 * Watch on changing
 *
 * For some browsers you have to add script autoreload.js
 * with snippet for reloading the page
 */
gulp.task('watch', function() {

    // Set some watcher on changing files
    gulp.watch('./client/jade/*', ['jade']);
    gulp.watch('./client/stylus/*', ['stylus']);
    gulp.watch('./client/coffee/*', ['coffee']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/ reload on change
    gulp.watch(['./dist/**']).on('change', livereload.changed);
});

// Define default task
gulp.task('default', ['clean'], function() {
    gulp.start('jade', 'stylus', 'coffee', 'move-js', 'watch');
});
