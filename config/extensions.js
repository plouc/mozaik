const paths      = require('./paths')
const appPackage = require(paths.appPackageJson)


module.exports = Object.keys(appPackage.dependencies)
    .filter(pkg => pkg.includes('mozaik-ext-'))
