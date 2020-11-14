'use strict';

const { watch, src, dest, series, task } = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const livereload = require('gulp-livereload');

sass.compiler = require('node-sass');

const dist = () => {
    const distSCSS = () => {
        return src('./src/scss/style.scss')
            .pipe(sassGlob())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(dest('./css'));
    }

    const distJS = () => {
        return src('./src/js/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(concat('app.js'))
            .pipe(uglify())
            .pipe(dest('./web/assets/dist/js'));
    }

    return series(distSCSS, distJS);
}

const scssCompiler = () => {
    return src('./src/theme/src/scss/style.scss')
        .pipe(sassGlob())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(dest('./lib/modules/assets/public/css'));
}

exports.dist = series(dist);
exports.default = series(
    scssCompiler
);

task('watch', function(){
    watch('./src/scss/**/*.scss', { ignoreInitial: false }, series(scssCompiler));
});