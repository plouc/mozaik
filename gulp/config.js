var path = require('path');

module.exports = {
    root:       path.resolve(process.cwd()) + path.sep,
    mozaikRoot: path.resolve(path.join(__dirname, '..')) + path.sep,
    src:        path.resolve(path.join(process.cwd(), 'src')) + path.sep,
    mozaikSrc:  path.resolve(path.join(__dirname, '..', 'src')) + path.sep,
    dest:       path.resolve(path.join(process.cwd(), 'build')) + path.sep
};