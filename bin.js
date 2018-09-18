#!/usr/bin/env node

const exec = require('child_process').spawn
const program = require('commander')
const pkgJson = require('./package.json')

program
  .option('-w, --watch', 'watch mode')
  .option('-s, --source <path>', 'source sketch file path')
  .option('-d, --dist [path]', 'dist folder path', './dist')
  .option('-f, --fontName [fontname]', 'name of icon font', 'symbols')
  .option('-c, --className [classname]', 'class name of icon elemen', 'icon')
  .version(pkgJson.version)

program.parse(process.argv)

const {
  watch,
  source,
  dist,
  fontName,
  className,
} = program

const normalizeArgs = [watch ? 'watch' : 'symbols', '--dist', program.dist, '--source', source || ' ', '--fontName', fontName, '--className', className]

const ps = exec('./node_modules/.bin/gulp', normalizeArgs)

ps.stdout.on('data', (data) => {
  process.stdout.write(data)
})

ps.stderr.on('data', (data) => {
  console.error({
    err: data
  })
})