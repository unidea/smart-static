'use strict';

// Gulp related requirements
const gulp = require('gulp');
const sass = require('gulp-sass');
const cache = require('gulp-cached');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const gutil = require('gulp-util');

const DEV = './development';
const BUILD = './_build';

// Commun paths (glob) for files and extensions.
const PATHS = {
  copied: [
    `${DEV}/bower_components`,
    `${DEV}/fonts`,
    `${DEV}/vendor`
  ],
  files: [`${DEV}/**/*.{html,xml,json}`],
  folders: [
    `${DEV}/css{,/**}`,
    `${DEV}/js{,/**}`,
    `${DEV}/scss{,/**}`
  ],
  partials: [`${DEV}/partials{,/**}`],
  scripts: [`${DEV}/js/**/*.js`],
  styles: [`${DEV}/scss/**/*.scss`]
};

function negativizeGlobs (globs) {
  return globs.map((glob) => {
    if(!glob.startsWith('!')) {
      glob = "!" + glob;
    }
    return glob;
  });
}

// Delete the preview folder.
function deleteBuild () {
  return del(BUILD);
}

// Process Files and return the stream.
function copyFiles () {
  return gulp.src(PATHS.copied)
    .pipe(gulp.dest(BUILD));
};

// Process Files and return the stream.
function processFiles () {
  let path = [`${DEV}/**/*`].concat(
    negativizeGlobs(PATHS.copied),
    negativizeGlobs(PATHS.folders),
    negativizeGlobs(PATHS.partials)
  );

  return gulp.src(path)
    .pipe(changed(DEV))
    .pipe(fileInclude())
    .pipe(gulp.dest(BUILD));
};

// Process JS files and return the stream.
function processScripts () {
  return gulp.src(PATHS.scripts)
    .pipe(cache('scripts-cache'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${BUILD}/js`));
};

// Process SCSS files and return the stream.
function processStyles () {
  return gulp.src(PATHS.styles)
    .pipe(cache('styles-cache'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${BUILD}/css`))
    .pipe(browserSync.stream());
};

// Watch Files, SCSS and JS for changes.
function watchChanges () {
  let path = [`${DEV}/**/*.{html,xml,json}`].concat(
    negativizeGlobs(PATHS.copied),
    negativizeGlobs(PATHS.folders)
  );

  let watcher = gulp.watch(path, gulp.series(processFiles, browserSync.reload));

  watcher.on('change', (path, stats) => {
    gutil.log(`File ${path} changed`);
  });

  gulp.watch(PATHS.scripts, gulp.series(processScripts, browserSync.reload));
  gulp.watch(PATHS.styles, gulp.series(processStyles));
};

// Start the server
function startServer (callback) {
  browserSync.init({
    open: false,
    reloadDebounce: 2000,
    server: {
      baseDir: BUILD,
      index: "index.html",
    }
  }, callback);
}

// Task for cleaning.
gulp.task('clean', deleteBuild);

// Task for building a preview of the site, ready for deployment.
gulp.task('build', gulp.series(
  deleteBuild,
  copyFiles,
  gulp.parallel(processFiles, processScripts, processStyles)
));

// Task for starting the server with a preview of the site
gulp.task('serve', gulp.series('build', startServer, watchChanges));

// Gult default task
gulp.task('default', (callback) => {
  gutil.log("Please use gulp {clean|build|serve}");
  callback();
});
