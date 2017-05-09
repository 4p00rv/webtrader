const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');
const Sass = require('sass.js/dist/sass.node');
//Convert src/index.scss to css
let index_css = '';
Sass('src/index.scss', function (result) {
    index_css = result;
});

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/bundle/')
    },
    module: {
        rules: [{
            test: /(\.js\.map)$/,
            use: 'ignore-loader'
        }, {
            test: /^timepicker$/,
            use: 'imports?jquery-ui,jquery'
        }, {
            test: /^jquery-ui$/,
            use: 'jquery'
        }, {
            test: /^babel-runtime\/regenerator$/,
            use: 'exports?regeneratorRuntime',
        }, {
            test: /^highstock-release\/highstock$/,
            use: 'exports?Highcharts!imports?jquery',
        }, {
            "test": /^highstock-release\/modules\/exporting$/,
            "use": "imports?highstock-release/highstock"
        }, {
            "test": /^highstock-release\/modules\/offline-exporting$/,
            "use": "imports?highstock-release/modules/exporting"
        }, {
            "test": /^jquery-growl$/,
            "use": "imports?jquery"
        }, {
            "test": /^datatables$/,
            "use": "imports?jquery-ui"
        }, {
            "test": /^currentPriceIndicator$/,
            "use": "imports?highstock-release/highstock"
        }, {
            "test": /^sightglass$/,
            "use": "exports?sightglass"
        }, {
            "test": /^rivets$/,
            "use": "exports?rivets!imports?sightglass"
        }, {
            "test": /^highstock-release\/highcharts-more$/,
            "use": "imports?highstock-release/highstock"
        }, {
            "test": /^color-picker$/,
            "use": "imports?jquery"
        }, {
            "test": /^binary-longcode$/,
            "use": "imports?moment"
        }, {
            test: /\.es6$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['syntax-dynamic-import']
                }
            }],
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: "file-loader?name=images/[name].[ext]"
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }],
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
                from: 'bower_components/moment/min/moment.min.js',
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
        ])
    ],
    resolveLoader: {
        alias: {
            'css': 'style-loader!css-loader!sass-loader',
            'text': 'file-loader?name=[path][name].[ext]!extract-loader!html-loader?attrs=false'
        }
    },
    target: 'node',
    resolve: {
        modules: ['node_modules', 'bower_components', 'translations', 'src'],
        extensions: ['.es6', '.js'],
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
            'webtrader-charts': 'webtrader-charts/dist/webtrader-charts',
            'chosen': 'chosen-js/chosen.jquery',
            'highstock-release': 'highstock-release',
            'binary-longcode': 'binary-com-longcode/dist/main'
        }
    }
}