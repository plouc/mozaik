const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/socket', { target: 'http://localhost:5000/', ws: true }))
  app.use(proxy('/config', { target: 'http://localhost:5000/' }))
}
