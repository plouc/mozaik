const path = require('path')
const fs   = require('fs')

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const resolveOwn = relativePath => path.resolve(__dirname, relativePath)


module.exports = {
    appBuild:       resolveApp('build'),
    appPublic:      resolveApp('public'),
    appHtml:        resolveApp('public/index.html'),
    appIndexJs:     resolveApp('src/index.js'),
    ownIndexJs:     resolveOwn('../ui.js'),
    appPackageJson: resolveApp('package.json'),
    ownPackageJson: resolveOwn('../package.json'),
    appSrc:         resolveApp('src'),
    ownSrc:         resolveOwn('../src/ui'),
    yarnLockFile:   resolveApp('yarn.lock'),
    testsSetup:     resolveApp('src/setupTests.js'),
    appNodeModules: resolveApp('node_modules'),
    themes:         resolveOwn('../src/ui/themes'),
    // this is empty with npm3 but node resolution searches higher anyway:
    ownNodeModules: resolveOwn('../node_modules'),
}
