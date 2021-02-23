const gulp = require('gulp');
const pug = require('gulp-pug');
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

function pugCompileTask () {
  return gulp.src('./pug/*.pug')
    .pipe(pug({
      doctype: 'html',
      pretty: true,
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};

function browserSyncReloadTask (cb) {
  browserSync.reload();
  cb();
};

function watchFilesTask () {
  gulp.watch('./css/**/*', browserSyncReloadTask);
  gulp.watch('./pug/*.pug', pugCompileTask);
  gulp.watch('./js/*.js', browserSyncReloadTask);
};

const build = gulp.series(pugCompileTask,browserSyncTask, watchFilesTask);

exports.pug = pugCompileTask;
exports.default = build;
