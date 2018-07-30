const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const FontminPlugin = require('fontmin-webpack')

const browserConfig = {
    entry: {
        bundle: path.join(__dirname, 'client/index.js')
    },

    output: {
        path: path.join(__dirname, 'public', 'static'),
        publicPath:  '',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' }},
                ]
            },

            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { minimize: process.env.NODE_ENV === 'production' } },
                    { loader: 'sass-loader' }
                ]
            },

            {
                test: /(.woff2|.woff|.eot|.ttf|.otf|.svg)$/,
                loader: 'file-loader',
                options: {
                    name: "media/[name].[ext]",
                    publicPath: url => url.replace(/public/, "")
                }
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "media/[name].[ext]",
                            publicPath: url => url.replace(/public/, "")
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        }
                    }
                ]
            }

        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            "PropTypes":"prop-types"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};


const serverConfig = {
    entry: {
        server: path.join(__dirname, 'server/index.js')
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'public', 'server'),
        filename: 'server.js',
        libraryTarget: "commonjs2"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader/locals'
            },

            {
                test: /\.sass$/,
                loaders: ['css-loader', 'sass-loader']
            },

            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: 'babel-loader'
            },

            {
                test: /\.(gif|png|jpeg|jpg|svg|woff2|woff|eot|ttf|otf|webp)$/i,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "media/[name].[ext]",
                            publicPath: url => url.replace(/public/, ""),
                            emitFile: false
                        }
                    }
                ]
            }

        ]
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            'React': 'react',
            "PropTypes":"prop-types"
        })
    ]
};

if(process.env.NODE_ENV === 'production') {
    browserConfig.plugins.push(new UglifyJsPlugin());
    // serverConfig.plugins.push(new UglifyJsPlugin());
};

module.exports = [browserConfig, serverConfig];

// Output folder structure:
// /public
//  /static
//   *bundle.js
//   /media - media files
//   /css - main.css
// *server.js