'use strict';

// Gulp related requirements
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const gutil = require('gulp-util');
const fs = require('fs-extra');

const BASES = {
  dev: './development',
  build: './_build'
};

// Commun paths (glob) for files and extensions.
const PATHS = {
  copied: [
    `${BASES.dev}/bower_components`,
    `${BASES.dev}/fonts`,
    `${BASES.dev}/vendor`
  ],
  files: [`${BASES.dev}/**/*.{html,xml,json}`],
  folders: [
    `${BASES.dev}/css{,/**}`,
    `${BASES.dev}/js{,/**}`,
    `${BASES.dev}/scss{,/**}`
  ],
  images: [`${BASES.dev}/images{,/**}`],
  partials: [`${BASES.dev}/partials{,/**}`],
  scripts: [`${BASES.dev}/js/**/*.js`],
  styles: [`${BASES.dev}/scss/**/*.scss`]
};

function negativizeGlobs (globs) {
  return globs.map((glob) => {
    if(!glob.startsWith('!')) {
      glob = "!" + glob;
    }
    return glob;
  });
};

// Delete the preview folder.
function deleteBuild (callback) {
  fs.remove(BASES.build, callback);
};

// Process Images and return the stream.
function copyImages (callback) {
  let src = `${BASES.dev}/images`;
  let dest = `${BASES.build}/images`

  fs.copy(src, dest, {
    clobber: true,
    preserveTimestamps: true
  }, callback);
};

// Copy Files and return the stream.
function copyFiles () {
  return gulp.src(PATHS.copied)
    .pipe(gulp.dest(BASES.build));
};

// Process Files and return the stream.
function processFiles () {
  let path = [`${BASES.dev}/**/*`].concat(
    negativizeGlobs(PATHS.copied),
    negativizeGlobs(PATHS.folders),
    negativizeGlobs(PATHS.images),
    negativizeGlobs(PATHS.partials)
  );

  return gulp.src(path)
    //.pipe(changed(BASES.build))
    .pipe(fileInclude())
    .pipe(gulp.dest(BASES.build));
};

// Process JS files and return the stream.
function processScripts () {
  return gulp.src(PATHS.scripts)
    .pipe(cache('scripts-cache'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${BASES.build}/js`));
};

// Process SCSS files and return the stream.
function processStyles () {
  return gulp.src(PATHS.styles)
    .pipe(cache('styles-cache'))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${BASES.build}/css`))
    .pipe(browserSync.stream());
};

function processImages () {
  return gulp.src(`${BASES.dev}/images/**/*.{png,jpg,jpeg,gif,svg}`)
    .pipe(optipng({ optimizationLevel: 3 })())
    .pipe(pngquant({ quality: "65-80", speed: 4 })())
    .pipe(imageminMozjpeg({ quality: 70 })())
    .pipe(gulp.dest(`${BASES.build}/images`));
};

// Watch Files, SCSS and JS for changes.
function watchChanges () {
  let path = [`${BASES.dev}/**/*.{html,xml,json}`].concat(
    negativizeGlobs(PATHS.copied),
    negativizeGlobs(PATHS.folders),
    negativizeGlobs(PATHS.images)
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
      baseDir: BASES.build,
      index: "index.html",
    }
  }, callback);
}

// Task for cleaning.
gulp.task('clean', deleteBuild);

// Task for processing images.
gulp.task('images', copyImages);

// Task for building a preview of the site, ready for deployment.
gulp.task('build', gulp.series(
  deleteBuild,
  copyFiles,
  copyImages,
  gulp.parallel(processFiles, processScripts, processStyles)
));

// Task for starting the server with a preview of the site
gulp.task('serve', gulp.series('build', startServer, watchChanges));

// Gult default task
gulp.task('default', (callback) => {
  gutil.log("Please use gulp {clean|build|images|serve}");
  callback();
});
