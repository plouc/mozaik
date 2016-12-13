const path                          = require('path')
const autoprefixer                  = require('autoprefixer')
const webpack                       = require('webpack')
const HtmlWebpackPlugin             = require('html-webpack-plugin')
const CaseSensitivePathsPlugin      = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin             = require('extract-text-webpack-plugin')
const InterpolateHtmlPlugin         = require('react-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
//const getClientEnvironment          = require('./env')
const paths                         = require('./paths')
const themes                        = require('./themes')
const extensions                    = require('./extensions')


// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/'

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = ''

// Get environment variables to inject into our app.
var env = {} //getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    devtool: 'cheap-module-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    // The first two entry points enable "hot" CSS and auto-refreshes for JS.
    entry: [
        // Include an alternative client for WebpackDevServer. A client's job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes). When you
        // make a syntax error, this client will display a syntax error overlay.
        // Note: instead of the default WebpackDevServer client, we use a custom one
        // to bring better experience for Create React App users. You can replace
        // the line below with these two lines if you prefer the stock client:
        // require.resolve('webpack-dev-server/client') + '?/',
        // require.resolve('webpack/hot/dev-server'),
        require.resolve('react-dev-utils/webpackHotDevClient'),
        // We ship a few polyfills by default:
        //require.resolve('./polyfills'),
        // Finally, this is your app's code:
        paths.appIndexJs,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
    ],
    output: {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'static/js/bundle.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
        // We use `fallback` instead of `root` because we want `node_modules` to "win"
        // if there any conflicts. This matches Node resolution mechanism.
        fallback: paths.nodePaths,
        // These are the reasonable defaults supported by the Node ecosystem.
        extensions: ['.js', '.json', ''],
        alias: {
        },
        // This is important if you want to refer to module resources.
        // It is important to use ~ symbol to reference module:
        // @import "~font-awesome/scss/font-awesome";
        modulesDirectories: [
            paths.appNodeModules,
            paths.ownNodeModules,
        ],
    },
    // Resolve loaders (webpack plugins for CSS, images, transpilation) from the
    // directory of `mozaik` itself rather than the project directory.
    resolveLoader: {
        root:            paths.ownNodeModules,
        moduleTemplates: ['*-loader'],
    },
    module: {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        preLoaders: [
            {
                test:    /\.js$/,
                loader:  'eslint',
                include: paths.appSrc,
            }
        ],
        loaders: [
            // Default loader: load all assets that are not handled
            // by other loaders with the url loader.
            // Note: This list needs to be updated with every change of extensions
            // the other loaders match.
            // E.g., when adding a loader for a new supported file extension,
            // we need to add the supported extension to this loader too.
            // Add one new line in `exclude` for each loader.
            //
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
                exclude: [
                    /\.html$/,
                    /\.js$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/,
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                },
            },
            // Process JS with Babel.
            {
                test:    /\.js$/,
                include: [
                    paths.appSrc,
                    paths.ownSrc,
                    paths.ownIndexJs,
                    // Required to include Mozaïk extensions
                    /mozaik-ext-[a-z0-9-]+(\/|\\)src/,
                ],
                loader:  'babel',
                query: {
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                },
            },
            {
                test:   /\.styl/,
                loader: ExtractTextPlugin.extract('style', 'css!stylus-relative'),
            },
            {
                test:   /\.css$/,
                loader: 'style!css',
            },
            {
                test:   /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file?name=fonts/[name].[ext]',
            },
            {
                test:   /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            },
            // JSON is not enabled by default in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
              test: /\.json$/,
              loader: 'json'
            },
            // "file" loader for svg
            {
                test: /\.svg$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                },
            },
        ],
    },
    // Point ESLint to our predefined config.
    eslint: {
        configFile:  path.join(__dirname, '../.eslintrc'),
        useEslintrc: false,
    },
    stylus: {
        paths:  extensions.map(ext => path.join(paths.appNodeModules, ext)),
        define: {
            'mozaik-extensions': extensions,
        },
    },
    plugins: [
        // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject:   true,
            template: paths.appHtml,
        }),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        // Also injects available themes
        new webpack.DefinePlugin(Object.assign({}, env, {
            MOZAIK_THEMES: JSON.stringify(themes),
        })),
        new ExtractTextPlugin(
            '[name]-[id]-[contenthash:8].css',
            { allChunks: true }
        ),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin(),
        // If you require a missing module and then `npm install` it, you still have
        // to restart the development server for Webpack to discover it. This plugin
        // makes the discovery automatic so you don't have to restart.
        // See https://github.com/facebookincubator/create-react-app/issues/186
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
        // Hacky, but prevents loading all moment locales
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(en)$/
        ),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs:  'empty',
        net: 'empty',
        tls: 'empty',
    },
}
