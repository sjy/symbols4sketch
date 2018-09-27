#!/usr/bin/env node

const exec = require('child_process').spawn
const path = require('path')
const program = require('commander')
const pkgJson = require('./package.json')

program
  .option('--no-preview', 'do not preview generated icons')
  .option('-s, --source <path>', 'source sketch file path')
  .option('-d, --dist [path]', 'dist folder path', './dist')
  .option('-f, --fontName [fontname]', 'name of icon font', 'symbols')
  .option('-c, --className [classname]', 'class name of icon elemen', 'icon')
  .version(pkgJson.version)

program.parse(process.argv)

const {
  preview,
  source,
  dist,
  fontName,
  className,
} = program

const normalizeArgs = [
  '--color',
  '--cwd', '.',
  '--gulpfile', path.resolve(__dirname, 'gulpfile.js'),
  preview ? 'watch' : 'symbols',
  '--dist', dist,
  '--source', source || ' ',
  '--fontName', fontName,
  '--className', className,
]

const ps = exec(path.resolve(__dirname, 'node_modules/.bin/gulp'), normalizeArgs)

ps.stdout.on('data', (data) => {
  process.stdout.write(data)
})

ps.stderr.on('data', (data) => {
  process.stderr.write(data)
})
