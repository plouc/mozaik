import winston from 'winston';
import path    from 'path';
import chalk   from 'chalk';
import Bus     from './Bus';
import express from 'express';

class Mozaik {
    constructor(config) {
        this.logger = winston;

        this.config = config;

        this.serverConfig = {
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

    /**
     * @param  {Express} app
     */
    startServer(app) {
        app = app || express();

        require('./server')(this, app);
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

export default Mozaik;