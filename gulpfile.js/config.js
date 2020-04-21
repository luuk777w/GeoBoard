module.exports = {
    files: {
        js: [
            'js/**/*.js',
            'js/*.js',
            'pages/**/*.js'
        ],
        sass: {
            watch: [
                'css/**/*.sccs',
                'css/*.scss',
                'pages/**/*.scss'
            ],
            pages: [
                './pages/{*,}/'
            ],
            sass: [
                'css/**/*.sccs',
                'css/*.scss'
            ]
        },
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