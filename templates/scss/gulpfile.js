const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
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

// "compact" | "compressed" | "expanded" | "nested"
function sassCompileTask () {
  return gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
};

function browserSyncReloadTask (cb) {
  browserSync.reload();
  cb();
};

function watchFilesTask () {
  gulp.watch('./scss/**/*', sassCompileTask);
  gulp.watch('./*.html', browserSyncReloadTask);
  gulp.watch('./js/*.js', browserSyncReloadTask);
};

const build = gulp.series(sassCompileTask, browserSyncTask, watchFilesTask);

exports.sass = sassCompileTask;
exports.default = build;
