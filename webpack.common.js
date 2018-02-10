const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');


module.exports = {

    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'jw.bundle.js',
    },

    target: 'web',

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
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ],
    },

    resolve: {
        alias: {
            App: path.resolve(__dirname, 'src/App'),
            Components: path.resolve(__dirname, 'src/components'),
            Utils: path.resolve(__dirname, 'src/utils'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },

    plugins:  [
        new HtmlPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new CleanPlugin(path.resolve(__dirname, 'public'))
    ]
};
