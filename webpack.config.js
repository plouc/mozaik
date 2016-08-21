const webpack           = require('webpack')
const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const PROJECT_PATH = process.cwd()
const MOZAIK_PATH  = __dirname
const BUILD_DIR    = path.resolve(PROJECT_PATH, 'build')
const APP_DIR      = path.resolve(__dirname, 'src')

const projectPackage = require(path.join(PROJECT_PATH, 'package.json'))

const mozaikExtensions = []
for (let packageName in projectPackage.dependencies) {
    if (packageName.includes('mozaik-ext-')) {
        mozaikExtensions.push(packageName)
    }
}

const config = {
    output: {
        path:     BUILD_DIR,
        filename: '[name]-[hash:8].js',
    },
    modulesDirectories: ['node_modules'],
    resolve: {
        fallback: [
            APP_DIR,
        ],
        alias: {
            'react':     path.join(PROJECT_PATH, 'node_modules', 'react'),
            'react-dom': path.join(PROJECT_PATH, 'node_modules', 'react-dom'),
            'mozaik':    path.join(PROJECT_PATH, 'node_modules', 'mozaik'),
        },
        // This is important if you want to refer to module resources.
        // It is important to use ~ symbol to reference module:
        // @import "~font-awesome/scss/font-awesome";
        modulesDirectories: [
            'node_modules',
            '..'
        ]
    },
    resolveLoader: {
        // used to resolve webpack loaders,
        // useful when using npm linked packages
        // for extension authoring for example
        root: path.join(MOZAIK_PATH, 'node_modules')
    },
    module : {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                include: [
                    APP_DIR,
                    /mozaik/,
                ],
            },
            {
                test:   /\.styl/,
                loader: 'style!css!stylus',
            },
            {
                test:     /\.css$/,
                loader: 'style!css',
            },
            {
                test:   /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=fonts/[name].[ext]',
            },
            {
                test:   /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
            {
                test:   /\.png$/,
                loader: 'url?limit=100000',
            },
            {
                test:   /\.(jpg|gif)$/,
                loader: 'file',
            },
            {
                test:   /\.json$/,
                loader: 'json',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title:    'mozaik',
        }),
    ],
    stylus: {
        paths: mozaikExtensions.map(ext => {
            return path.join(PROJECT_PATH, 'node_modules', ext)
        }),
        define: {
            '$mozaik-extensions': mozaikExtensions,
        },
    },
}

if (process.env.NODE_ENV === 'production') {
    config.devtool = 'cheap-module-source-map'
    config.entry = [
        `${APP_DIR}/app`,
    ]
    config.module.loaders[0].loaders = ['babel']
    /*
    config.module.loaders[1].loader  = ExtractTextPlugin.extract('style', 'css!postcss!resolve-url')
    config.plugins.push(new ExtractTextPlugin(
        DOC_MODE ? '[name].css' : '[name]-[id]-[contenthash:8].css',
        { allChunks: true }
    ))
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }))
    */
} else {
    config.devtool = 'eval'
    config.entry = [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        path.join(PROJECT_PATH, 'src', 'app'),
    ]
    config.module.loaders[0].loaders = ['react-hot', 'babel?cacheDirectory']
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}


module.exports = config
