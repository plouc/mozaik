var express = require('express');
var app     = express();
var hub     = require('./src/core/hub');

app.use(express.static(__dirname + '/build'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('MOZAÏK listening at http://%s:%s', host, port);
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