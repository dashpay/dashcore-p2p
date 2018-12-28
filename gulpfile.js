'use strict';

var gulp = require('gulp');
var bitcoreTasks = require('@dashevo/dashcore-build');

bitcoreTasks('p2p', {skipBrowser: true});

gulp.task = bitcoreTasks.tasks;
