'use strict';

var gulp = require('gulp'),
    forever = require('forever-monitor'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    less = require('gulp-less');

gulp.task('less', function () {
    gulp.src('./client/assets/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./client/assets/css'));
});

gulp.task('watch-less', function() {
    gulp.watch([
        './client/assets/css/*.less'
    ], ['less']);
});

gulp.task('jshint-client', function() {
    gulp.src([
        './client/**/*.js',
        '!./client/vendor/**/*'
    ])
        .pipe(jshint())
        .pipe(plumber())
        .pipe(jshint.reporter());
});

gulp.task('jshint-client-watch', function() {
    gulp.watch([
        './client/**/*.js',
        '!./client/vendor/**/*'
    ], ['jshint-client']);
});

gulp.task('jshint-server', function() {
    gulp.src([
        './server/**/*.js'
    ])
        .pipe(jshint({
            node: true
        }))
        .pipe(plumber())
        .pipe(jshint.reporter());
});

gulp.task('jshint-server-watch', function() {
    gulp.watch([
        './server/**/*.js'
    ], ['jshint-server']);
});

gulp.task('node-server-watch', function() {
    var child = new (forever.Monitor)('server.js', {
        max: 1,
        sourceDir: 'server/',
        env: {'NODE_ENV': 'development'},
        watch: true,
        watchDirectory: 'server/'
    });

    child.on('exit', function() {
        console.log('server/server.js has exited');
    });

    child.start();
});

gulp.task('default', [
    'less',
    'jshint-client',
    'jshint-server',
    'watch-less',
    'jshint-client-watch',
    'jshint-server-watch',
    'node-server-watch'
]);
