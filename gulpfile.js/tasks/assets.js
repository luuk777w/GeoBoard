const { src, dest } = require('gulp');

const assets = function (assetsFiles) {
    return function () {

        return src(assetsFiles)
            .pipe(dest('./dist/assets'));
    }
};

exports.assets = assets;