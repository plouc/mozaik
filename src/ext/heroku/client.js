var Heroku = require('heroku-client');

var config = require('./../../../config');

var heroku;

function getClient() {
    if (!heroku) {
        heroku = new Heroku({
            token: config.api.heroku.apiToken
        });
    }

    return heroku;
}

module.exports = {
    appInfo: function (params) {
        return getClient().apps(params.app).info();
    }
};