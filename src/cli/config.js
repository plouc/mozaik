var path    = require('path');
var chalk   = require('chalk');
var Promise = require('bluebird');
var fs      = Promise.promisifyAll(require('fs'));
var swig    = require('swig');

var codeTemplatesPath = path.join(__dirname, '..', 'code-templates');

module.exports = {
    init: function (context) {
        context.logger.info(chalk.yellow('config path: ' + context.configPath));

        return fs.existsAsync(context.configPath)
            .then(function () {
                var configContent = swig.renderFile(path.join(codeTemplatesPath, 'config.swig.js'), {
                    version: context.version
                });

                return fs.writeFileAsync(context.configPath, configContent);
            })
            .catch(function (e) {
                console.log(e);
                throw new Error(context.configPath + ' already exists');
            })
        ;
    },

    load: function (context) {
        if (!fs.existsSync(context.configPath)) {
            throw new Error('No config file found try to run `mozaik init` first');
        }

        context.config = require(context.configPath);
    }
};