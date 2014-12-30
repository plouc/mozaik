var Promise = require('bluebird');
var Travis  = require('travis-ci');
var _       = require('lodash');

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
    },

    buildHistory: function (params) {
        var def = Promise.defer();

        travis.repos(params.owner, params.repository).builds.get(function (err, res) {
            if (err) {
                def.reject(err);
            }

            var commit;
            res.builds.forEach(function (build) {
                commit = _.find(res.commits, { id: build.commit_id });
                if (commit) {
                    build.commit = commit;
                }
            });

            def.resolve(res.builds);
        });

        return def.promise;
    }
};