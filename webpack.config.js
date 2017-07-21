const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const Sass = require('sass.js/dist/sass.node');
const webpack = require('webpack');

//Convert src/index.scss to css
let index_css = '';
Sass('src/index.scss', function (result) {
    index_css = result;
});

module.exports = {
    entry: {
        main: ['babel-polyfill', "./src/main.js"]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/bundle/')
    },
    module: {
        loaders: [{
            test: /^timepicker$/,
            loader: 'imports?jquery-ui,jquery'
        }, {
            test: /^jquery-ui$/,
            loader: 'jquery'
        }, {
            test: /^babel-runtime\/regenerator$/,
            loader: 'exports?regeneratorRuntime',
        }, {
            test: /^highstock-release\/highstock$/,
            loader: 'exports?Highcharts!imports?jquery',
        }, {
            "test": /^highstock-release\/modules\/exporting$/,
            "loader": "imports?highstock-release/highstock"
        }, {
            "test": /^highstock-release\/modules\/offline-exporting$/,
            "loader": "imports?highstock-release/modules/exporting"
        }, {
            "test": /^jquery-growl$/,
            "loader": "imports?jquery"
        }, {
            "test": /^datatables$/,
            "loader": "imports?jquery-ui"
        }, {
            "test": /^currentPriceIndicator$/,
            "loader": "imports?highstock-release/highstock"
        }, {
            "test": /^sightglass$/,
            "loader": "exports?sightglass"
        }, {
            "test": /^rivets$/,
            "loader": "exports?rivets!imports?sightglass"
        }, {
            "test": /^highstock-release\/highcharts-more$/,
            "loader": "imports?highstock-release/highstock"
        }, {
            "test": /^color-picker$/,
            "loader": "imports?jquery"
        }, {
            test: /\.es6$/,
            loader: 'babel-loader',
            include: [path.resolve(__dirname, 'src')],
            exclude: [/node_modules/],
            query: {
                plugins: [
                    "transform-runtime",
                    "typecheck",
                    "transform-decorators-legacy",
                    "transform-class-properties",
                    "add-module-exports",
                    "import-asserts",
                    "syntax-async-functions",
                    "transform-regenerator",
                ],
                presets: ['es2015', 'stage-0']
            },
        }, {
            test: /\.(css$|scss$)/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: "file-loader"
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
            { test: /\.(json$)/, loader: 'json-loader' },
            { test: /\.(html$)/, loader: 'html-loader' },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'src/index.html',
                to: 'index.html',
                transform: (content, file_path) => {
                    const decoded_content = decoder.write(content);
                    return Buffer.from(decoded_content.replace(/<style-url>/g, 'https://style.binary.com'))
                }
            }, {
                from: 'src/index.scss',
                to: 'index.css',
                transform: (content, file_path) => {
                    return Buffer.from(index_css.text);
                }
            }, {
                from: 'bower_components/intl/dist/Intl.complete.js',
                to: 'lib/intl/dist/Intl.complete.js'
            }, {
                from: 'src/common/util.js',
                to: 'common/util.js'
            }, {
                from: 'bower_components/jquery/dist/jquery.min.js',
                to: 'lib/jquery/dist/jquery.min.js'
            }, {
                from: 'node_modules/moment/min/moment.min.js',
                to: 'lib/moment/min/moment.min.js'
            }, {
                from: 'bower_components/alameda/alameda.js',
                to: 'lib/alameda/alameda.js'
            }, {
                from: 'src/main.html',
                to: 'main.html',
                transform: (content, file_path) => {
                    const decoded_content = decoder.write(content);
                    return Buffer.from(decoded_content.replace(/<style-url>/g, 'https://style.binary.com'))
                }
            }, {
                from: 'src/unsupported_browsers/unsupported_browsers.html',
                to: 'unsupported_browsers/unsupported_browsers.html',
                transform: (content, file_path) => {
                    const decoded_content = decoder.write(content);
                    return Buffer.from(decoded_content.replace(/<style-url>/g, 'https://style.binary.com'))
                }
            }
        ]),
        new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
            if (!/\/moment\//.test(context.context)) { return }
            // context needs to be modified in place
            Object.assign(context, {
                // include only CJK
                regExp: /^\.\/(ja|ko|zh)/,
                // point to the locale data folder relative to moment's src/lib/locale
                request: '../locale'
            })
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'global': {}, // bizarre lodash(?) webpack workaround
            'global.GENTLY': false // superagent client fix
        })
    ],
    target: 'node',
    resolve: {
        modules: ['node_modules', 'bower_components', 'translations', 'src'],
        extensions: ['.es6', '.js', '.css', '.scss'],
        alias: {
            'jquery': "jquery/dist/jquery.min",
            'jquery-ui': "jquery-ui/jquery-ui.min",
            'jquery.dialogextend': "binary-com-jquery-dialogextended/jquery.dialogextend.min",
            'jquery-growl': "growl/javascripts/jquery.growl",
            'jquery-validation': "jquery-validation/dist/jquery.validate.min",
            'modernizr': 'modernizr/modernizr',
            'color-picker': "colorpicker/jquery.colorpicker",
            'datatables': "datatables/media/js/jquery.dataTables.min",
            'datatables-jquery-ui': 'datatables/media/js/dataTables.jqueryui.min',
            'currentPriceIndicator': './charts/indicators/highcharts_custom/currentprice',
            'es6-promise': 'es6-promise/promise.min',
            'rivets': 'rivets/dist/rivets.min',
            'sightglass': 'sightglass/index',
            'timepicker': 'binary-com-jquery-ui-timepicker/jquery.ui.timepicker',
            'lodash': 'lodash/dist/lodash.min',
            'jquery-sparkline': 'jquery-sparkline/dist/jquery.sparkline.min',
            'moment': 'moment/min/moment.min',
            'moment-locale': 'moment/locale',
            'clipboard': 'clipboard/dist/clipboard.min',
            "indicator_levels": 'charts/indicators/level',
            'babel-runtime/regenerator': 'regenerator-runtime/runtime',
            'chosen': 'chosen-js/chosen.jquery',
            'highstock-release': 'highstock-release',
            'jquery-growl': 'jquery.growl'
        }
    }
}