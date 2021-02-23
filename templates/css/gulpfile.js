const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function browserSyncTask (cb) {
  browserSync.init({
    server: {
      baseDir: '.'
    },
    port: 3000
  });
  cb();
};

function browserSyncReloadTask (cb) {
  browserSync.reload();
  cb();
};

function watchFilesTask () {
  gulp.watch('./css/**/*', browserSyncReloadTask);
  gulp.watch('./*.html', browserSyncReloadTask);
  gulp.watch('./js/*.js', browserSyncReloadTask);
};

const build = gulp.series(browserSyncTask, watchFilesTask);

exports.default = build;
