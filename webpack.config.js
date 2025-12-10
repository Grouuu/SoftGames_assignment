const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
        clean: {
            keep(asset) {
                return asset.includes('styles/') || asset.includes('assets/');
            }
        }
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        hot: false,
        liveReload: true,
        open: false,
        port: 8080,
        compress: true,
        client: {
            overlay: false
        }
    },

    devtool: 'inline-source-map',

    performance: {
        hints: false,
    }
};