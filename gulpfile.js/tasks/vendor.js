const { src, dest } = require('gulp');
const concat = require("gulp-concat");

const vendor = function (vendorFiles) {
    return function () {

        return src(vendorFiles)
            .pipe(concat('vendor.js'))
            .pipe(dest('dist/js'));
    }
};

exports.vendor = vendor;
