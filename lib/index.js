var MozaikCli = require('./cli/mozaik-cli');

var cli = new MozaikCli();

module.exports = {
    cli:    cli,
    server: require('./server/mozaik-server')
};