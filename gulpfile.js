'use strict';
var electron = require('electron-connect').server.create();
var gulp = require('gulp')

gulp.task('serve', function () {

    electron.start();

    gulp.watch(['./main.js'], () => {
        console.log("Main")
        electron.restart();
    });

    gulp.watch(['./static/**/*.js', './static/**/*.css'], () => {
        console.log("Renderer")
        electron.reload();
    });
});


gulp.task('default', ['serve'])