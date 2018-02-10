const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = webpackMerge(commonConfig, {
    devtool: 'eval',

    entry: [
        'webpack-hot-middleware/client'
    ],

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
