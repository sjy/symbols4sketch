const gulp = require('gulp');
const rename = require('gulp-rename');
const sketch = require('gulp-sketch');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const bs = require('browser-sync').create();
const path = require('path');

/**
 * Font settings
 */
const fontName = 'hUI-symbols'; // set name of your symbol font
const className = 'icon'; // set class name in your CSS
const template = 'hui-style'; // or 'foundation-style' | 'fontawesome-style'

// 导出顺序按照 sketch里的icon name字母排序
const skethcFileName = path.resolve(
    __dirname,
    'sketches/symbol-font-14px-latest.sketch'
); // or 'symbol-font-16px.sketch'

const distFolder = path.resolve(__dirname, './dist'); // dist path

/**
 * Recommended to get consistent builds when watching files
 * See https://github.com/nfroidure/gulp-iconfont
 */
const timestamp = Math.round(Date.now() / 1000);

gulp.task(
    'symbols',
    () =>
        gulp
            .src(skethcFileName)
            .pipe(
                sketch({
                    export: 'artboards',
                    formats: 'svg',
                })
            )
            .pipe(
                iconfont({
                    fontName,
                    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
                    timestamp,
                    log: info => {
                        console.log(info);
                    }, // suppress unnecessary logging
                })
            )
            .on('glyphs', glyphs => {
                const options = {
                    className,
                    fontName,
                    fontPath: './fonts/', // set path to font (from your CSS file if relative)
                    glyphs: glyphs.map(mapGlyphs),
                };
                gulp
                    .src(`templates/${template}.css`)
                    .pipe(consolidate('lodash', options))
                    .pipe(rename({basename: fontName}))
                    .pipe(gulp.dest(distFolder)); // set path to export your CSS

                // if you don't need sample.html, remove next 4 lines
                gulp
                    .src(`templates/${template}.html`)
                    .pipe(consolidate('lodash', options))
                    .pipe(rename({basename: 'preview'}))
                    .pipe(gulp.dest(distFolder)); // set path to export your sample HTML
            })
            .pipe(gulp.dest(distFolder + '/fonts/')) // set path to export your fonts
);

gulp.task('watch', ['symbols'], () => {
    bs.init({
        files: distFolder + '/preview.html',
        server: distFolder,
        startPath: '/preview.html',
        middleware: cacheControl,
    });
    gulp.watch('./sketches/*.sketch', ['symbols']);
});

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
    return {name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0)};
}

/**
 * This keeps browser from caching fonts for your testing environment
 */
function cacheControl(req, res, next) {
    res.setHeader('Cache-control', 'no-store');
    next();
}
