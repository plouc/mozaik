const webpack           = require('webpack')
const path              = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
    devtool: 'source-source-map',
    debug:   true,
    entry:   './src/ui/index.js',
    output:  {
        filename:     'ui.js',
        library:      'mozaik',
        libraryTarget:'umd',
    },
    plugins: [
        new ExtractTextPlugin('ui.css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loaders: [
                    'babel'
                ]
            }
        ]
    },
    externals: {
        "lodash": "lodash",
        "redux": "redux",
        "react": "react",
        "react-dom": "react-dom",
        "react-motion": "react-motion",
        "react-redux": "react-redux",
        "react-svg-buttons": "react-svg-buttons",
        "redux-thunk": "redux-thunk",
        "socket.io-client": "socket.io-client",
        "immutable": "immutable",
    },
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    }
};