module.exports = {
    production: false,
    files: {
        js: [
            'js/**/*.js',
            'js/*.js',
            'pages/**/*.js'
        ],
        sass: [
            'css/**/*.sccs',
            'css/*.scss',
            'pages/**/*.scss',
            'partials/**/*.scss'
        ],
        vendor: [
            'vendor/*.js'
        ],
        handlebars: [
            'pages/*.hbs',
            'pages/**/*.hbs',
            'partials/layouts/*.hbs',
            'partials/layouts/**/*.hbs',
        ],
        handlebars_partials: [
            'partials/includes/*.hbs',
            'partials/includes/**/*.hbs',
        ],
        assets: [
            'assets/**/*.*',
            'assets/*.*'
        ]
    },
    order: {
        js: [
            'js/**/*.js',
            'js/*.js',
            'pages/**/*.js'
        ],
        sass: [
            'css/main.scss',
            'css/**/*.sccs',
            'css/*.scss',
            'pages/**/*.scss'
        ]
    },
};
