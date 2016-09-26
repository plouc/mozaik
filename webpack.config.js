const webpack           = require('webpack')
const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin       = require('clean-webpack-plugin')
const glob              = require('glob')


const PROJECT_PATH    = process.cwd()
const SRC_PATH        = path.join(PROJECT_PATH, 'src')
const APP_PATH        = path.join(SRC_PATH, 'app')
const MOZAIK_PATH     = __dirname
const BUILD_PATH      = path.resolve(PROJECT_PATH, 'build')
const MOZAIK_SRC_PATH = path.resolve(MOZAIK_PATH, 'src')
const THEMES_PATH     = path.join(MOZAIK_SRC_PATH, 'ui', 'themes')

const projectPackage = require(path.join(PROJECT_PATH, 'package.json'))

const mozaikExtensions = Object.keys(projectPackage.dependencies)
    .filter(packageName => packageName.includes('mozaik-ext-'))

const themes = glob.sync(path.join(THEMES_PATH, '*'))
    .map(t => t.substr(THEMES_PATH.length + 1))

const config = {
    output: {
        path:     BUILD_PATH,
        filename: '[name]-[hash:8].js',
    },
    modulesDirectories: ['node_modules'],
    resolve: {
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
        root: path.join(MOZAIK_PATH, 'node_modules'),
    },
    module : {
        loaders: [
            {
                test:    /\.js$/,
                include: [
                    MOZAIK_SRC_PATH,
                    path.join(MOZAIK_PATH, 'ui.js'),
                    SRC_PATH,
                    /mozaik-ext-[a-z0-9-]+\/src/,
                ],
            },
            {
                test:   /\.styl/,
                loader: 'style!css!stylus-relative',
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
            template: path.join(MOZAIK_SRC_PATH, 'index.html'),
            title:    'mozaik',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            MOZAIK_THEMES:          JSON.stringify(themes),
        }),
        // Hacky, but prevents loading all moment locales
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(en)$/
        ),
    ],
    stylus: {
        paths: mozaikExtensions.map(ext => {
            return path.join(PROJECT_PATH, 'node_modules', ext)
        }),
        define: {
            'mozaik-extensions': mozaikExtensions,
        },
    },
}

if (process.env.NODE_ENV === 'production') {
    config.devtool = 'cheap-module-source-map'
    config.entry   = [APP_PATH]
    config.module.loaders[0].loaders = ['babel']
    config.module.loaders[1].loader  = ExtractTextPlugin.extract('style', 'css!stylus-relative')
    config.plugins.push(new ExtractTextPlugin(
        '[name]-[id]-[contenthash:8].css',
        { allChunks: true }
    ))
    config.plugins.push(new CleanPlugin(BUILD_PATH, {
        root: PROJECT_PATH,
    }))
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
    //config.plugins.push(new webpack.optimize.DedupePlugin())
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
} else {
    config.devtool = 'eval'
    config.entry = [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        APP_PATH,
    ]
    config.module.loaders[0].loaders = ['react-hot', 'babel?cacheDirectory']
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

console.log(config.module.loaders[0]);

module.exports = config
