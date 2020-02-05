const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/socket', { target: 'http://localhost:5003/', ws: true }))
  app.use(proxy('/config', { target: 'http://localhost:5003/' }))
}
