const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const fn = function (filesTs) {
    return function () {

        let tsProject = ts.createProject('./tsconfig.json', {
            declaration: true
        });

        let tsResult = src(filesTs)
            .pipe(tsProject());

        return merge([
            tsResult.dts
                .pipe(concat('app.d.ts'))
                .pipe(dest('./dist/definitions')),
            tsResult.js
                .pipe(concat('app.js'))
                .pipe(dest('./dist/js'))
        ]);

    }
};

exports.js = fn;
