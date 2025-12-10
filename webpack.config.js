const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
        publicPath: '',
        chunkFilename: 'js/[name].js',
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
        parser: {
            javascript: {
                // prevent libraries from splitting dynamic imports into multiple chunks
                dynamicImportMode: 'lazy'
            }
        }
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

    // keep source maps but not inline
    devtool: 'source-map',

    performance: {
        hints: false,
    },

    optimization: {
        splitChunks: false,
        runtimeChunk: false,
        minimize: false
    },
};
