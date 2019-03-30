/*eslint global-require: "error"*/
/*jslint node:true */
"use strict";

// Importy
const gulp = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const replace = require("gulp-replace");
const concat = require("gulp-concat");
const fs = require("fs");

// Verze scriptů
const pkg = require('./package.json');
const VERSION = pkg.version;

// Final soubory
const FILE_LIGHT = "enhanced-easy-project_light-theme.user.js";
const FILE_DARK = "enhanced-easy-project_dark-theme.user.js";

// Jména
const TITLE_LIGHT = "Enhanced Easy Project - Light Theme";
const TITLE_DARK = "Enhanced Easy Project - Dark Theme";

/**
 * CSS - Light Theme version
 */
gulp.task("css-build-light", function () {
    return gulp
        .src(["./src/less/main-light.less"])
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("./temp/css"));
});

/**
 * CSS - Dark Theme version
 */
gulp.task("css-build-dark", function () {
    return gulp
        .src(["./src/less/main-dark.less"])
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("./temp/css"));
});

/**
 * Generování Light Theme UserScriptu
 */
gulp.task("js-build-light", function() {
    return gulp
        .src(["./src/js/user-script_header.js", "./src/js/user-script_body.js"])
        .pipe(replace("##TITLE##", TITLE_LIGHT))
        .pipe(replace("##VERSION##", VERSION))
        .pipe(replace("##FILENAME##", FILE_LIGHT))
        .pipe(replace("##CSS##", function(match) {
            return fs.readFileSync('./temp/css/main-light.css');
          }))
        .pipe(concat(FILE_LIGHT))
        .pipe(gulp.dest("./dist"));
});

/**
 * Generování Dark Theme UserScriptu
 */
gulp.task("js-build-dark", function() {
    return gulp
        .src(["./src/js/user-script_header.js", "./src/js/user-script_body.js"])
        .pipe(replace("##TITLE##", TITLE_DARK))
        .pipe(replace("##VERSION##", VERSION))
        .pipe(replace("##FILENAME##", FILE_DARK))
        .pipe(replace("##CSS##", function(match) {
            return fs.readFileSync('./temp/css/main-dark.css');
          }))
        .pipe(concat(FILE_DARK))
        .pipe(gulp.dest("./dist"));
});

/**
 * Generování DEBUG verze Dark Theme UserScriptu
 */
gulp.task("js-build-dark-dev", function() {
    return gulp
        .src(["./src/js/user-script_header.js", "./src/js/user-script_body.js"])
        .pipe(replace("##TITLE##", TITLE_DARK))
        .pipe(replace("##VERSION##", VERSION))
        .pipe(replace("##FILENAME##", FILE_DARK))
        .pipe(replace("##CSS##", function(match) {
            return fs.readFileSync('./temp/css/main-dark.css');
          }))
        .pipe(concat(FILE_DARK))
        .pipe(gulp.dest("./temp/build"));
});

gulp.task("css",
    gulp.parallel(["css-build-light", "css-build-dark"])
);

gulp.task("js",
    gulp.parallel(["js-build-light", "js-build-dark"])
);

gulp.task("dev",
    gulp.series(["css-build-dark", "js-build-dark-dev"])
);

gulp.task("default",
    gulp.parallel(
        gulp.series(["css-build-light", "js-build-light"]),
        gulp.series(["css-build-dark", "js-build-dark"])
    )
);
