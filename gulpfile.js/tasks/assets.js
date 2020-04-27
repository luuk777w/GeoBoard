const { src, dest } = require('gulp');
const merge = require('merge-stream');

const assets = function (assetsFiles) {
    return function () {

        const assets = src(assetsFiles)
            .pipe(dest('./dist/assets'));

        const favicon = src("favicon.ico")
            .pipe(dest('./dist'))

        return merge(assets, favicon);
    }
};

exports.assets = assets;
