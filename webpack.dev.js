const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body',
            chunks: ['app'],
            publicURL: 'http:dev-assert.jieda.ltd',
        }),

        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('development'),
            }
        }),
    ]
});