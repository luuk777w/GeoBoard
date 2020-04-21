const config = require('./config');
const { watch, series, task } = require('gulp');

const js = require('./tasks/js').js(config.files.js, config.order.js);
js.displayName = 'js';

const sass = require('./tasks/sass').sass(config.files.sass, config.order.sass);
sass.displayName = 'sass';

const vendor = require('./tasks/vendor').vendor(config.files.vendor);
vendor.displayName = 'vendor';

const handlebars = require('./tasks/handlebars').handlebars(config.files.handlebars, config.files.handlebars_partials);
handlebars.displayName = 'handlebars';

const assets = require('./tasks/assets').assets(config.files.assets);
assets.displayName = 'assets';

const watchFiles = () => {

    watch(config.files.sass, series(sass));
    watch(config.files.js, series(js));
    watch(config.files.handlebars, series(handlebars));
    watch(config.files.handlebars_partials, series(handlebars));
    watch(config.files.assets, series(assets));

};

const build = (done) => {
    js();
    sass();
    vendor();
    handlebars();
    assets();
    done();
}

exports.default = build;
exports.build = build
exports.js = js;
exports.sass = sass;
exports.watch = watchFiles;
exports.vendor = vendor;
exports.handlebars = handlebars;
exports.assets = assets;
