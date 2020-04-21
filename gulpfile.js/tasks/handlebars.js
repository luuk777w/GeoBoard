var path = require('path');
const { src, dest } = require('gulp');
const gulp_handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const handlebars = function (files_handlebars, files_partials_handlebars) {
    return function () {

        const templates = src(files_handlebars)
            .pipe(gulp_handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'App.Templates',
                noRedeclare: true, // Avoid duplicate declarations
            }));

        const partials = src(files_partials_handlebars)
            .pipe(gulp_handlebars())
            .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
                imports: {
                    processPartialName: function (fileName) {
                        return JSON.stringify(path.basename(fileName, '.js'));
                    }
                }
            }));

        return merge(partials, templates)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'));

    }
}



exports.handlebars = handlebars;