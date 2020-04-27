const { src, dest } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const replace = require('gulp-replace');

const index = function () {
    return function () {

        // TODO: Replace /dist/
        return src("index.html")
            .pipe(htmlmin({
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                removeComments: true
            }))
            .pipe(replace(/dist\//g, function() {
                return "";
            }))
            .pipe(dest('./dist'));
    }
};

exports.index = index;
