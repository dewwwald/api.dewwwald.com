const gulp   = require('gulp');
const gutil  = require('gulp-util');
const extend = require('extend');
const rsync  = require('rsyncwrapper');

const conf   = require('../gulpconfig');
const secret = require('../secrets');

function processRsync(done, rsyncOpts = {}) {
  rsyncOpts = extend({
    port: conf.ssh.port,
    ssh: true,
    recursive: true,
    compareMode: 'checksum',
    args: extend(['--verbose'], conf.ssh.options),
  }, rsyncOpts);

  gutil.log(gutil.colors.green(`Rsyncing from ${rsyncOpts.src} to ${rsyncOpts.dest}`));

  return rsync(rsyncOpts, function(error, stdout, stderr, cmd) {
    if (error) { gutil.log(gutil.colors.red(error)); }
    gutil.log('Command: \n', cmd);
    gutil.log(stderr, stdout);
    return done();
  });
};

function prepareRsync(done, prop, isToRemote = true, rsyncOpts = {}) {
  ['dest', 'src'].forEach(function(curr) {
    const remoteHost = `${secret.username}@${secret.domain}:`;
    rsyncOpts[curr] = rsyncOpts[curr] ? rsyncOpts[curr] : conf.rsync[prop][curr];

    if (isToRemote && curr === 'dest') { rsyncOpts[curr] = `${remoteHost}${rsyncOpts[curr]}`; }
    if (!isToRemote && curr === 'src') { return rsyncOpts[curr] = `${remoteHost}${rsyncOpts[curr]}`; }
  });

  rsyncOpts.exclude = conf.rsync[prop].exclude || '';

  return processRsync(done, rsyncOpts);
};





//*------------------------------------*\
//     $RSYNC DOWN DRY RUN
//*------------------------------------*/
gulp.task('rsync:downdry', done => prepareRsync(done, 'down', false, {dryRun: true}));





//*------------------------------------*\
//     $RSYNC DOWN
//*------------------------------------*/
gulp.task('rsync:down', done => prepareRsync(done, 'down', false));





//*------------------------------------*\
//     $RSYNC TO PROD DRY RUN
//*------------------------------------*/
gulp.task('rsync:updry', done => prepareRsync(done, 'up', true, {dryRun: true}));





//*------------------------------------*\
//     $RSYNC TO PROD
//*------------------------------------*/
gulp.task('rsync:up', done => prepareRsync(done, 'up'));





//*------------------------------------*\
//     $RSYNC TO PROD DRY RUN
//*------------------------------------*/
gulp.task('rsync:serverdry', done => prepareRsync(done, 'server', true, {dryRun: true}));





//*------------------------------------*\
//     $RSYNC TO PROD
//*------------------------------------*/
gulp.task('rsync:server', done => prepareRsync(done, 'server'));
