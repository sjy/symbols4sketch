/* eslint-disable no-console */
const gulp = require('gulp')
const rename = require('gulp-rename')
const sketch = require('gulp-sketch')
const iconfont = require('gulp-iconfont')
const consolidate = require('gulp-consolidate')
const bs = require('browser-sync').create()
const path = require('path')
const fs = require('fs')

const parseArgv = require('./util/parseArgv')

const {
  fontName,
  className,
  source,
  dist,
} = parseArgv(process.argv)

const template = path.relative(__dirname, 'templates')

// TODO: 导出顺序按照 sketch 里的icon name字母排序
// check existance
const skethcFileName = source || path.resolve(__dirname, 'sketches/symbol-font-16px.sketch')
if (!fs.existsSync(skethcFileName)) {
  // throw new Error('Invalid sketch file path', skethcFileName)
  console.error('Invalid sketch file path', skethcFileName)
  process.exit(-1)
}

const distFolder = dist

const timestamp = Math.round(Date.now() / 1000)

/**
 * This is needed for mapping glyphs and codepoints.
 */
function mapGlyphs(glyph) {
  return {
    name: glyph.name,
    codepoint: glyph.unicode[0].charCodeAt(0),
  }
}

/**
 * This keeps browser from caching fonts for your testing environment
 */
function cacheControl(req, res, next) {
  res.setHeader('Cache-control', 'no-store')
  next()
}

gulp.task('symbols', () => gulp
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
      startUnicode: 0xf000,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp,
      log: info => {
        console.log(info)
      },
    })
  )
  .on('glyphs', glyphs => {
    const options = {
      className,
      fontName,
      fontPath: './fonts/', // set path to font (from your CSS file if relative)
      glyphs: glyphs.map(mapGlyphs),
    }

    gulp
      .src(`${template}/style.css`)
      .pipe(consolidate('lodash', options))
      .pipe(
        rename({
          basename: fontName,
        })
      )
      .pipe(gulp.dest(distFolder)) // set path to export your CSS

    gulp
      .src(`${template}/style.html`)
      .pipe(consolidate('lodash', options))
      .pipe(
        rename({
          basename: 'preview',
        })
      )
      .pipe(gulp.dest(distFolder)) // set path to export your sample HTML
  })
  .pipe(gulp.dest(`${distFolder}/fonts/`)))

gulp.task('watch', ['symbols'], () => {
  bs.init({
    files: `${distFolder}/preview.html`,
    server: distFolder,
    startPath: '/preview.html',
    middleware: cacheControl,
  })
  gulp.watch(skethcFileName, ['symbols'])
})
