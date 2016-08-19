const webpack          = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config           = require('./webpack.config')

new WebpackDevServer(webpack(config), {
    publicPath:         config.output.publicPath,
    hot:                true,
    historyApiFallback: true,
}).listen(8081, 'localhost', (err) => {
    if (err) {
        return console.error(err)
    }

    console.log('Dev server Listening at http://localhost:8081/')
})