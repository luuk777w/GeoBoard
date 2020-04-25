module.exports = {
    production: false,
    files: {
        js: [
            'src/js/**/*.js',
            'src/js/*.js',
            'src/pages/**/*.js'
        ],
        sass: [
            'src/css/**/*.sccs',
            'src/css/*.scss',
            'src/pages/**/*.scss',
            'src/partials/**/*.scss'
        ],
        vendor: [
            'vendor/*.js'
        ],
        handlebars: [
            'src/pages/*.hbs',
            'src/pages/**/*.hbs',
            'src/partials/layouts/*.hbs',
            'src/partials/layouts/**/*.hbs',
        ],
        handlebars_partials: [
            'src/partials/includes/*.hbs',
            'src/partials/includes/**/*.hbs',
        ],
        assets: [
            'assets/**/*.*',
            'assets/*.*'
        ]
    },
    order: {
        js: [
            'src/js/**/*.js',
            'src/js/*.js',
            'src/pages/**/*.js'
        ],
        sass: [
            'src/css/main.scss',
            'src/css/**/*.sccs',
            'src/css/*.scss',
            'src/pages/**/*.scss'
        ]
    },
};
