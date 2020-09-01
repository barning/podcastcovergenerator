var gulp = require('gulp');
var sass = require('gulp-sass');
var rollupStream = require('@rollup/stream');
var source = require('vinyl-source-stream');

var commonjs = require('@rollup/plugin-commonjs');
var { nodeResolve } = require('@rollup/plugin-node-resolve');
var babel = require('rollup-plugin-babel');
var terser = require('rollup-plugin-terser').terser;

var browserSync = require('browser-sync');

gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('rollup', () => {
    const options = {
        input: 'js/main.js',
        output: {
            file: 'main.js',
            format: 'iife',
        },
        plugins: [
            nodeResolve(
                {
                    mainFields: ['module', 'main']
                }
            ),
            commonjs(),
            babel({
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    };
    return rollupStream(options)
        .pipe(source('main.js'))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('styles', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('default', gulp.series('styles', 'rollup', function () {
    gulp.watch("js/**/*.js", gulp.series('rollup', 'bs-reload'));
    gulp.watch("scss/**/*.scss", gulp.series('styles'));
    gulp.watch("app/**/*.html", gulp.series('bs-reload'));

    browserSync({
        server: {
            baseDir: "./app"
        }
    });
}));
