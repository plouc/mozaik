var fs          = require('fs');
var path        = require('path');
var onlyScripts = require('./util/script-filter');
var tasks       = fs.readdirSync(path.resolve(path.join(__dirname, 'tasks'))).filter(onlyScripts);

tasks.forEach(function (task) {
    require('./tasks/' + task);
});