import express from 'express';
import swig    from 'swig';
import chalk   from 'chalk';
import path    from 'path';
import _       from 'lodash';

/**
 * @param {Mozaik} mozaik
 * @param {Express} app
 */
export default function (mozaik, app) {

    const config = mozaik.serverConfig;

    mozaik.logger.info(chalk.yellow(`serving static contents from ${mozaik.baseDir}build`));
    app.use(express.static(`${mozaik.baseDir}/build`));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(mozaik.rootDir, 'templates'));
    app.set('view cache', false);
    swig.setDefaults({
        cache: false
    });

    app.get('/', (req, res) => {
        res.render('index', {
            env:           mozaik.config.env,
            appTitle:      mozaik.config.appTitle,
            assetsBaseUrl: mozaik.config.assetsBaseUrl
        });
    });

    app.get('/config', (req, res) => {
        res.send(_.omit(mozaik.config, 'api'));
    });

    const server = app.listen(config.port, config.host, () => {
        mozaik.logger.info(chalk.yellow(`Mozaïk server listening at http://${config.host}:${config.port}`));
    });

    const WebSocketServer = require('ws').Server;
    const wss             = new WebSocketServer({ server: server });

    let currentClientId = 0;

    wss.on('connection', (ws) => {
        const clientId = ++currentClientId;

        mozaik.bus.addClient(ws, clientId);

        ws.on('message', (request) => {
            mozaik.bus.clientSubscription(clientId, JSON.parse(request));
        });

        ws.on('close', () => {
            mozaik.bus.removeClient(clientId);
        });
    });
};