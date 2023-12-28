'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// CSS COMPILE
function buildStyles() {
  return gulp.src("src/scss/**/*.scss", { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css", { sourcemaps: "." }));
};

// JAVASCRIPT COMPILE
function buildScripts() {
  return gulp.src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(rename("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js"));
}

function watch() {
  gulp.watch("src/scss/**/*.scss", buildStyles);
  gulp.watch("src/js/**/*.js", buildScripts);
};

exports.style = buildStyles;
exports.script = buildScripts;
exports.watch = watch;