const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const themes = [
    'solarized-dark',
    'night-blue',
    'sunny',
    'wine',
    'snow',
    'mini',
    'mini-kuro',
]

const entry = {}
themes.forEach(t => {
    entry[t] = `./src/${t}/theme.js`
})

module.exports = {
    devtool: 'source-source-map',
    debug: true,
    entry,
    output: {
        path: 'themes',
        filename: '[name].js',
        library: 'mozaik-themes',
        libraryTarget: 'umd',
    },
    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true,
        }),
        new webpack.NoErrorsPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
                ),
            },
            {
                test: /\.js$/,
                loaders: ['babel'],
            },
        ],
    },
    externals: {},
    resolve: {
        extensions: ['', '.js'],
    },
}
