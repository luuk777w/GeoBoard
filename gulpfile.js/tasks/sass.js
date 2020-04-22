const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');
const order = require('gulp-order');
var path = require('path');

const sass = function (files_sass, filesSassOrder) {
    return function () {

        return src(files_sass)
            .pipe(order(filesSassOrder, { base: './' }))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'));
    }
};

exports.sass = sass;