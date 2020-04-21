const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');
const order = require('gulp-order');
const flatmap = require('gulp-flatmap');
var path = require('path');

const sass = function (files_sass, filesSassOrder, files_pages_sass) {
    return function () {

        src(files_pages_sass, { base: './scss' })
            .pipe(flatmap(function (stream, dir) {
                return src(dir.path + '/*.scss')
                    .pipe(gulpSass().on('error', gulpSass.logError))
                    .pipe(concat('style.css'))
                    .pipe(dest('./dist/css/pages/' + path.relative(dir.base, dir.path)));
            }));



        return src(files_sass)
            .pipe(order(filesSassOrder, { base: './' }))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'));
    }
};

exports.sass = sass;