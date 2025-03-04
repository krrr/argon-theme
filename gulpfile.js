// for css minify and merge
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

function minifyCSS() {
    return gulp.src('assets/css/argon.css')
    .pipe(cleanCSS({level: {1: {specialComments: 0}}})) // 压缩 CSS
        .pipe(rename('argon.min.css'))
        .pipe(gulp.dest('assets/css/'));
}

// 定义一个任务来压缩和合并 CSS 文件
function minifyAndConcatCSS() {
    const list = gulp.src([
        'assets/css/argon.min.css',
        'assets/vendor/font-awesome/css/font-awesome.min.css',
        'assets/vendor/izitoast/css/iziToast.css',
        'assets/vendor/pickr/themes/monolith.min.css',
        'assets/vendor/fancybox/jquery.fancybox.min.css',
        'assets/vendor/tippy.js/**/*.css'
    ]);

    // 合并两个流
    return list
        .pipe(cleanCSS({level: {1: {specialComments: 0}}})) // 压缩 CSS
        .pipe(replace('../fonts/fontawesome', 'vendor/font-awesome/fonts/fontawesome'))
        .pipe(concat('argon_css_merged.css')) // 合并成一个文件
        .pipe(gulp.dest('assets/')); // 输出到指定目录
}

// 默认任务
exports.default = gulp.series(minifyCSS, minifyAndConcatCSS);
