/**
 * Created by rmolodyko on 17.11.2015.
 */

// Include some modules
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    rm = require('gulp-rimraf'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');
    concat = require('gulp-concat');

///**
// * Remove all resources before compilation
// */
//gulp.task('clean', function() {
//    return gulp.src('./dist/html', { read: false })
//        .pipe(rm());
//});
//
///**
// * Task to compile jade files
// */
//gulp.task('jade', function() {
//
//    // Compile all files in templates folder
//    gulp.src('./client/jade/templates/*')
//        .pipe(jade())
//        .pipe(gulp.dest('./dist/html'));
//
//    // Compile main jade/html file
//    gulp.src('./client/jade/index.jade')
//        .pipe(jade())
//        .pipe(gulp.dest('./dist'));
//});

/**
 * Task to compile styl files
 */
gulp.task('stylus', function () {
    gulp.src('./core/server/resources/custom/style/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./core/server/dist/css'));
});

///**
// * Task to compile coffee script files
// */
//gulp.task('coffee', function() {
//    gulp.src('./client/coffee/*')
//        .pipe(coffee({bare: true}).on('error', gutil.log))
//        .pipe(gulp.dest('./dist/js'));
//});
//
///**
// * Task to move javascript files
// */
//gulp.task('move-js', function() {
//    gulp.src('./client/js/*')
//        .pipe(gulp.dest('./dist/js'));
//});
//
///**
// * Watch on changing
// *
// * For some browsers you have to add script autoreload.js
// * with snippet for reloading the page
// */
//gulp.task('watch', function() {
//
//    // Set some watcher on changing files
//    //gulp.watch('./client/jade/*', ['jade']);
//    gulp.watch('./client/stylus/*', ['stylus']);
//    //gulp.watch('./client/coffee/*', ['coffee']);
//
//    // Create LiveReload server
//    //livereload.listen();
//
//    // Watch any files in dist/ reload on change
//    //gulp.watch(['./dist/**']).on('change', livereload.changed);
//});

//// Define default task
//gulp.task('default', ['clean'], function() {
//    gulp.start('coffee', 'move-js', 'watch');
//});

gulp.task('clean-main-coffee', function() {
    return gulp.src('./server.js', { read: false })
        .pipe(rm());
});

gulp.task('compile-main-coffee', ['clean-main-coffee'], function() {
    console.log('restart');
    gulp.src('./server.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

//gulp.task('compile-core', function() {
//    gulp.src('./core/**/*.coffee')
//        .pipe(coffee({bare: true}).on('error', gutil.log))
//        .pipe(gulp.dest('./core/build'));
//});

//gulp.task('watch-main-coffee', function() {
//    gulp.watch('./server.coffee', ['compile-main-coffee']);
//});

gulp.task('watch-core', ['watch-main-javascript'], function() {
    gulp.watch('./core/**/*.coffee', ['compile-main-coffee']);
    gulp.watch('./core/**/*.jade', ['compile-main-coffee']);
    gulp.watch('./core/**/*.yaml', ['compile-main-coffee']);
    gulp.watch('./core/server/resources/custom/style/**/*.styl', ['stylus']);
});

gulp.task('watch-main-javascript', function() {

    nodemon({
        script: './server.coffee',
        ext: 'coffee js',
        env: { 'NODE_ENV': 'development' }
    }).on('restart', function(){
        livereload.changed('server.coffee');
    });
});

gulp.task('start-server', function() {

    // listen for changes
    livereload.listen();

    gulp.start(
        'stylus',
        'watch-core'
        //'watch-main-javascript'
        //'compile-core'
    );
});

