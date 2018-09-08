'use strict';
var electron = require('electron-connect').server.create();
var gulp = require('gulp')

gulp.task('serve', function () {

    electron.start();

    gulp.watch(['./main.js'], () => {
        electron.restart();
    });

    gulp.watch(["./static/**/**"], () => {
        electron.reload();
    });
});


gulp.task('default', ['serve'])