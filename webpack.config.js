const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        mode: argv.mode || 'development',
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
            filename: isProduction ? 'js/[name].[contenthash].js' : 'js/index.js',
            path: path.resolve(__dirname, 'build'),
            clean: {
                keep: /styles|assets/,
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './build/index.html',
                inject: 'body',
                scriptLoading: 'blocking'
            }),
        ],
        optimization: {
        splitChunks: {
            chunks: 'all',
        },
        },
        performance: {
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
        },
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
        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
};