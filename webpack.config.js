const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './build/index.html',
            inject: 'body',
            scriptLoading: 'blocking'
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 9000,
        hot: false,
        liveReload: true,
        watchFiles: ['src/**/*'],
    },
    devtool: 'eval-source-map',
};