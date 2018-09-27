# symbols4sketch

> An amazing cli tool helping convert sketch to icon fonts

<p align="start">
  <a href="https://npmcharts.com/compare/symbols4sketch?minimal=true"><img src="https://img.shields.io/npm/dm/symbols4sketch.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/symbols4sketch"><img src="https://img.shields.io/npm/v/symbols4sketch.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/symbols4sketch"><img src="https://img.shields.io/npm/l/symbols4sketch.svg" alt="License"></a>
  <br>
</p>

## Featurs

- Support convert from templated based sketch file which contains various icon.

## Requirements

- Mac
- [Sketch](https://www.sketchapp.com/)
- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/) or [npm](https://docs.npmjs.com/)

## Get Start

``` bash
yarn global add symbols4sketch
# or npm install
```

## Test

``` bash
s4s --help
Usage: s4s [options]
Options:
  -w, --watch                  watch mode
  -s, --source <path>          source sketch file path
  -d, --dist [path]            dist folder path (default: ./dist)
  -f, --fontName [fontname]    name of icon font (default: symbols)
  -c, --className [classname]  class name of icon elemen (default:icon)
  -V, --version                output the version number
  -h, --help                   output usage information
```

## Issue & Camplain

[submit new issue](https://github.com/sjy/symbols4sketch/issues/new)

## Enjoy It 🎉

## TODO

- [] Save files built by watching mode to tmp path by default
