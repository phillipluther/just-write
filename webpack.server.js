'use strict';

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PUBLIC_PATH = path.resolve(__dirname, 'public');


module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, 'src/server/index.js')
    ],

    output: {
        path: PUBLIC_PATH,
        publicPath: '/',
        filename: 'jw.server.js',
    },

    target: 'node',
    watch: true,

    externals: [
        nodeExternals({
            whitelist: 'webpack/hot/poll?1000',
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },

    plugins: [
        new StartServerPlugin('jw.server.js'),
        new CleanWebpackPlugin(PUBLIC_PATH),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'BUILD_TARGET': JSON.stringify('server'),
            },
        })
    ],

    resolve: {
        alias: {
            App: path.resolve(__dirname, 'src/common/App'),
            Components: path.resolve(__dirname, 'src/common/components'),
            Utils: path.resolve(__dirname, 'src/common/utils'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },

};
