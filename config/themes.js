const path  = require('path')
const glob  = require('glob')
const paths = require('./paths')


module.exports = glob.sync(path.join(paths.themes, '*'))
    .map(t => t.substr(paths.themes.length + 1))
