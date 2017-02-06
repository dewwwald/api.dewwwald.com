const gulp = require('gulp');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;


//*------------------------------------*\
//     $GULPFILE
//*------------------------------------*/
const requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: false});

gulp.task('default', () => 
    console.log('Gulp is on like donkey kong!')
);