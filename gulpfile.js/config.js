module.exports = {
    production: false,
    files: {
        ts: [
            'src/js/**/*.ts',
            'src/js/*.ts',
            'src/pages/**/*.ts'
        ],
        sass: [
            'src/css/**/*.scss',
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
        sass: [
            'src/css/**/*.sccs',
            'src/css/main.scss',
            'src/css/*.scss',
            'src/pages/*/*.scss',
            'src/pages/**/*.scss'
        ]
    },
};
