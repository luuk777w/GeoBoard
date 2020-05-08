const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');

const fn = function (filesTs) {
    return function () {

        let tsProject = ts.createProject('./tsconfig.json', {
            declaration: true
        });

        return src(filesTs)
            .pipe(tsProject())
            .pipe(concat('app.js'))
            .pipe(dest('./dist/js'));
    }
};

exports.js = fn;
