const { src, dest } = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');
const order = require('gulp-order');

const sass = function (files_sass, filesSassOrder, serverProjectPath) {
    return function () {
        return src(files_sass)
            .pipe(order(filesSassOrder, { base: './' }))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'))
            .pipe(dest(serverProjectPath + 'css'));
    }
};

exports.sass = sass;