const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const clientConfig = Object.assign({}, require('./webpack.config'))
clientConfig.plugins = []

module.exports = merge(clientConfig, {
    target: 'node',
    devtool: 'none',
    entry: './src/server.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueSSRServerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.template.html',
            inject: false,
            minify: process.env.NODE_ENV === 'production' ? {
                html5: true,
                collapseWhitespace: true,
            } : false,
        }),
    ],
})