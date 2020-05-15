const { dest } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');


const bundle = function (filesTs) {
    return function () {

        return browserify({
            basedir: '.',
            entries: ['src/js/app.ts'],
        })
            .plugin(tsify)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(terser())
            .pipe(sourcemaps.write('./'))
            .pipe(dest('./dist/js'));
    }
};

exports.bundle = bundle;
