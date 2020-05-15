const config = require('./config');
const { watch, series, task } = require('gulp');

const bundle = require('./tasks/bundle').bundle(config.files.ts);
bundle.displayName = 'bundle';

const sass = require('./tasks/sass').sass(config.files.sass, config.order.sass, config.production);
sass.displayName = 'sass';

const handlebars = require('./tasks/handlebars').handlebars(config.files.handlebars, config.files.handlebars_partials);
handlebars.displayName = 'handlebars';

const assets = require('./tasks/assets').assets(config.files.assets);
assets.displayName = 'assets';

const indexHtml = require('./tasks/index').index();
indexHtml.displayName = 'index.html';

const watchFiles = () => {

    watch(config.files.sass, series(sass));
    watch(config.files.ts, series(bundle));
    watch(config.files.handlebars, series(handlebars, bundle));
    watch(config.files.handlebars_partials, series(handlebars, bundle));
    watch(config.files.assets, series(assets));

    watch("index.html", series(indexHtml));
};

const build = (done) => {

    sass();
    handlebars();
    assets();
    indexHtml();
    bundle();
    done();
}

exports.default = build;
exports.build = build
exports.bundle = bundle;
exports.sass = sass;
exports.watch = watchFiles;
exports.handlebars = handlebars;
exports.assets = assets;
exports.indexHtml = indexHtml;
