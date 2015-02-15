var pkg           = require('./../../package.json');
var chalk         = require('chalk');
var program       = require('commander');
var winston       = require('winston');
var config        = require('./config');
var packageConfig = require('./package_config');
var path          = require('path');
var Promise       = require('bluebird');
var server        = require('./../server/mozaik-server.js');

function Mozaik(base, args) {
    base = base || process.cwd();
    args = args || {};

    this.baseDir = base + path.sep;
    this.version = pkg.version;

    this.configPath  = args.config ? path.resolve(base, args.config) : path.join(base, 'config.js');
    this.packagePath = path.resolve(base, 'package.json');

    this.logger = winston;

    this.program = program
        .version(this.version)
    ;

    this.program
        .command('init')
        .description('init mozaik config and directory structure')
        .action(function (env, options) {
            this.init();
        }.bind(this));
    ;

    this.program
        .command('server')
        .description('start mozaik server')
        .action(function (env, options) {
            this.startServer();
        }.bind(this));
    ;

    this.logger.info(chalk.green('Mozaïk [' + this.version + ']'));
};

Mozaik.prototype.start = function () {
    this.program.parse(process.argv);
};

Mozaik.prototype.init = function () {
    this.logger.info(chalk.green('Init'));

    Promise.settle([
        config.init(this),
        packageConfig.init(this)
    ])
        .then(function(results) {
            results.forEach(function (result) {
                if (result.isRejected()) {
                    this.logger.error(chalk.red(result.error().message));
                }
            }.bind(this));
        }.bind(this))
    ;
};

Mozaik.prototype.startServer = function () {
    config.load(this);
    server.start(this);
};

Mozaik.prototype.version = function () {

};

module.exports = Mozaik;
