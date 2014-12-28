var Reflux     = require('reflux');
var _          = require('lodash');
var config     = require('./../../../config');
var ApiActions = require('./../actions/ApiActions');

var ApiStore = Reflux.createStore({
    init: function () {
        this.ws = new WebSocket('ws://localhost:3000');
        this.ws.onmessage = function (event) {
            console.log(JSON.parse(event.data));
            this.trigger(JSON.parse(event.data));
        }.bind(this);

        this.listenTo(ApiActions.get, this.get);
    },

    get: function (id, params) {
        if (this.ws.readyState != WebSocket.OPEN) {
            throw new Error('Web socket not connected !');
        }

        this.ws.send(JSON.stringify({
            id:     id,
            params: params || {}
        }));
    }
});

module.exports = ApiStore;