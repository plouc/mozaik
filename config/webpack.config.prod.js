const path                  = require('path')
const webpack               = require('webpack')
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const ExtractTextPlugin     = require('extract-text-webpack-plugin')
const ManifestPlugin        = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const url                   = require('url')
const paths                 = require('./paths')
const themes                = require('./themes')
const extensions            = require('./extensions')
//var getClientEnvironment = require('./env')


function ensureSlash(path, needsSlash) {
    var hasSlash = path.endsWith('/')
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1)
    } else if (!hasSlash && needsSlash) {
        return path + '/'
    } else {
        return path
    }
}

// We use "homepage" field to infer "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const homepagePath     = require(paths.appPackageJson).homepage
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/'

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = ensureSlash(homepagePathname, true)

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = ensureSlash(homepagePathname, false)

// Get environment variables to inject into our app.
const env = { 'process.env': {
    NODE_ENV: '"production"',
} }//getClientEnvironment(publicUrl);

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: 'source-map',
    // In production, we only want to load the polyfills and the app code.
    entry: [
        //require.resolve('./polyfills'),
        paths.appIndexJs,
    ],
    output: {
        // The build folder.
        path: paths.appBuild,
        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        // We don't currently advertise code splitting but Webpack supports it.
        filename:      'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
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
    // directory of `react-scripts` itself rather than the project directory.
    resolveLoader: {
        root: paths.ownNodeModules,
        moduleTemplates: ['*-loader'],
    },
    module: {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        preLoaders: [
            {
                test:    /\.(js|jsx)$/,
                loader:  'eslint',
                include: paths.appSrc,
            },
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
            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.svg$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name:  'static/media/[name].[hash:8].[ext]',
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
                loader: 'babel',
                query:  {
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
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
            // JSON is not enabled by default in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
                test:   /\.json$/,
                loader: 'json',
            },
            // "file" loader for svg
            {
                test:   /\.svg$/,
                loader: 'file',
                query:  {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ],
    },
    // Point ESLint to our predefined config.
    eslint: {
        // TODO: consider separate config for production,
        // e.g. to enable no-console and no-debugger only in production.
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
        // In production, it will be an empty string unless you specify "homepage"
        // in `package.json`, in which case it will be the pathname of that URL.
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        }),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject:   true,
            template: paths.appHtml,
            minify:   {
                removeComments:                true,
                collapseWhitespace:            false,
                removeRedundantAttributes:     true,
                useShortDoctype:               true,
                removeEmptyAttributes:         true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash:              true,
                minifyJS:                      true,
                minifyCSS:                     true,
                minifyURLs:                    true,
            },
        }),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV was set to production here.
        // Otherwise React will be compiled in the very slow development mode.
        // Also injects available themes
        new webpack.DefinePlugin(Object.assign({}, env, {
            MOZAIK_THEMES: JSON.stringify(themes),
        })),
        new ExtractTextPlugin(
            '[name]-[id]-[contenthash:8].css',
            { allChunks: true }
        ),
        // This helps ensure the builds are consistent if source hasn't changed:
        new webpack.optimize.OccurrenceOrderPlugin(),
        // Try to dedupe duplicated modules, if any:
        new webpack.optimize.DedupePlugin(),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings:  false,
            },
            mangle: {
                screw_ie8: true,
            },
            output: {
                comments:  false,
                screw_ie8: true,
            },
        }),
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        })
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs:  'empty',
        net: 'empty',
        tls: 'empty',
    }
}
