const config = require('./config');
const { watch, series } = require('gulp');

const js = require('./tasks/js').js(config.files.js, config.order.js);
js.displayName = 'js';

const sass = require('./tasks/sass').sass(config.files.sass.sass, config.order.sass, config.files.sass.pages);
sass.displayName = 'sass';

const vendor = require('./tasks/vendor').vendor(config.files.vendor);
vendor.displayName = 'vendor';

const handlebars = require('./tasks/handlebars').handlebars(config.files.handlebars, config.files.handlebars_partials);
handlebars.displayName = 'handlebars';

const hello = function (done) {
    done();
}

const watchFiles = () => {

    watch(config.files.sass.watch, series(sass));
    watch(config.files.js, series(js));
    watch(config.files.handlebars, series(handlebars));
    watch(config.files.handlebars_partials, series(handlebars));

};

exports.default = hello;
exports.js = js;
exports.sass = sass;
exports.watch = watchFiles;
exports.vendor = vendor;
exports.handlebars = handlebars;