const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');
const order = require('gulp-order');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');

const sass = function (files_sass, filesSassOrder, production) {
    return function () {

        return src(files_sass)
            .pipe(order(filesSassOrder, { base: './' }))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(gulpif(production, cleanCSS({ compatibility: 'ie8' })))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'));
    }
};

exports.sass = sass;
