const { src, dest } = require('gulp');
const order = require("gulp-order");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglifyjs")
const gulpif = require('gulp-if');

const fn = function (filesJs, filesJsOrder, production) {
    return function () {

        return src(filesJs)
            .pipe(order(filesJsOrder, { base: './' }))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(gulpif(production, uglify({ compress: true })))
            .pipe(dest('./dist/js'))
    }
};

exports.js = fn;
