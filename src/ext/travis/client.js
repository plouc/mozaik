var Promise = require('bluebird');
var Travis  = require('travis-ci');

var travis = new Travis({
    version: '2.0.0'
});

module.exports = {
    repository: function (params) {
        var def = Promise.defer();

        travis.repos(params.owner, params.repository).get(function (err, res) {
            if (err) {
                def.reject(err);
            }

            def.resolve(res.repo);
        });

        return def.promise;
    }
};