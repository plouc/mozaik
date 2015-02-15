var express = require('express');
var swig    = require('swig');
var chalk   = require('chalk');
var _       = require('lodash');

var app;

module.exports = {
    start: function (context) {
        context.logger.info(chalk.yellow('starting Mozaïk server…'));

        var config = context.config;

        app = express();

        app.engine('html', swig.renderFile);
        app.use(express.static(__dirname + '/build'));
        app.set('view engine', 'html');
        app.set('views', __dirname + '/templates');
        app.set('view cache', false);
        swig.setDefaults({
            cache: false
        });

        app.get('/', function (req, res) {
            res.render('index', {
                env: config.env
            });
        });

        app.get('/config', function (req, res) {
            res.send(_.omit(config, 'api'));
        });

        var server = app.listen(config.port, function () {
            console.log('Mozaïk listening at http://%s:%s', config.host, config.port);
        });

        var WebSocketServer = require('ws').Server;
        var wss             = new WebSocketServer({ server: server });

        var currentClientId = 0;

        wss.on('connection', function (ws) {
            var clientId = ++currentClientId;

            hub.add(ws, clientId);

            ws.on('message', function (request) {
                hub.wire(clientId, JSON.parse(request));
            });

            ws.on('close', function () {
                hub.remove(clientId);
            });
        });
    }
};