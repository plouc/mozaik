var _    = require('lodash');
var fs   = require('fs');
var path = require('path');
var glob = require('glob');

var apis = {};

var files = glob.sync('src/ext/*/client.js');
files.forEach(function (file) {
    var parts = file.split(path.sep);
    var id    = parts[parts.length - 2];

    apis[id] = require(path.relative(__dirname, path.resolve(file)));
});


var clients = {};

module.exports = {
    add: function (client, id) {
        clients[id] = {
            client:        client,
            subscriptions: []
        };

        console.log('Client #%d connected', id);
    },

    remove: function (id) {
        console.log('Client #%d disconnected', id);
    },

    wire: function (clientId, request) {
        var parts = request.id.split('.');

        if (!apis[parts[0]]) {
            console.log('Unable to find API matching id "%s"', parts[0]);

            return;
        }

        var api = apis[parts[0]];
        if (!api[parts[1]]) {
            console.log('Unable to find API call matching "%s"', parts[1]);

            return;
        }

        api[parts[1]](request.params)
            .then(function (data) {
                var message = {
                    id:   request.id,
                    body: data
                };

                clients[clientId].client.send(JSON.stringify(message));
            })
        ;
    }
};