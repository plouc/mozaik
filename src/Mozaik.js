var winston = require('winston');
var path    = require('path');
var chalk   = require('chalk');
var Bus     = require('./Bus');

class Mozaik {
    constructor(config) {
        this.logger = winston;

        this.config = config;

        this.serverConfig = {
            env:  config.env,
            host: config.host,
            port: config.port
        };

        this.config.appTitle         = this.config.appTitle      || 'Mozaïk';
        this.config.assetsBaseUrl    = this.config.assetsBaseUrl || '';
        this.config.useWssConnection = !!this.config.useWssConnection;

        this.baseDir = (config.baseDir || process.cwd()) + path.sep;
        this.rootDir = path.resolve(__dirname);

        this.bus = new Bus(this);
    }

    startServer() {
        require('./server')(this);
    }

    /**
     * @param {Object} config The convict config schema to validate against
     */
    loadApiConfig(config) {
        // load and validate config
        config.load(this.config.api);

        try {
            config.validate();
        } catch (e) {
            this.logger.error(chalk.red(e.message));
            process.exit(1);
        }
    }
}

module.exports = Mozaik;
