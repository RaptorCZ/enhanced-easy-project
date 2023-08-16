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
const pkg = require("./package.json");
const VERSION = pkg.version;

// Final soubory
const FILE_DARK_COMPACT = "enhanced-easy-project_dark-compact-theme.user.js";

// Jména
const TITLE_DARK_COMPACT = "Enhanced Easy Project - Dark Compact Theme";

/**
 * CSS - Dark Compact Theme version
 */
gulp.task("css-build-dark-compact", function() {
    return gulp
        .src(["./src/less/main-dark-compact.less"])
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest("./temp/css"));
});

/**
 * Generování Dark Compact Theme UserScriptu
 */
gulp.task("js-build-dark-compact", function() {
    return gulp
        .src(["./src/js/user-script_header.js", "./src/js/user-script_body.js"])
        .pipe(replace("##TITLE##", TITLE_DARK_COMPACT))
        .pipe(replace("##VERSION##", VERSION))
        .pipe(replace("##FILENAME##", FILE_DARK_COMPACT))
        .pipe(
            replace("##CSS##", function() {
                return fs.readFileSync("./temp/css/main-dark-compact.css");
            })
        )
        .pipe(concat(FILE_DARK_COMPACT))
        .pipe(gulp.dest("./dist"));
});

/**
 * Generování DEBUG verze Dark Compact Theme UserScriptu
 */
gulp.task("js-build-dark-compact-dev", function() {
    return gulp
        .src(["./src/js/user-script_header.js", "./src/js/user-script_body.js"])
        .pipe(replace("##TITLE##", TITLE_DARK_COMPACT))
        .pipe(replace("##VERSION##", VERSION))
        .pipe(replace("##FILENAME##", FILE_DARK_COMPACT))
        .pipe(
            replace("##CSS##", function() {
                return fs.readFileSync("./temp/css/main-dark-compact.css");
            })
        )
        .pipe(concat(FILE_DARK_COMPACT))
        .pipe(gulp.dest("./temp/build"));
});

gulp.task("css", gulp.series(["css-build-dark-compact"]));

gulp.task("js", gulp.series(["js-build-dark-compact"]));

gulp.task("dev", gulp.series(["css-build-dark-compact", "js-build-dark-compact-dev"]));

gulp.task("default", gulp.series(["css-build-dark-compact", "js-build-dark-compact"]));
