var path                 = require('path');
var chalk                = require('chalk');
var defaultPackageConfig = require('./default_package_config');
var Promise              = require('bluebird');
var fs                   = Promise.promisifyAll(require('fs'));

module.exports = {
    init: function (context) {
        context.logger.info(chalk.yellow(context.packagePath));

        return fs.existsAsync(context.packagePath)
            .then(function () {
                return fs.writeFileAsync(context.packagePath, JSON.stringify(defaultPackageConfig, null, 2));
            })
            .catch(function () {
                throw new Error(context.packagePath + ' already exists');
            })
        ;
    }
};