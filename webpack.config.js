const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            css: path.resolve(__dirname, 'src/css'),
            containers: path.resolve(__dirname, 'src/containers'),
            models: path.resolve(__dirname, 'src/models'),
            views: path.resolve(__dirname, 'src/views'),
            services: path.resolve(__dirname, 'src/services'),
            store: path.resolve(__dirname, 'src/store'),
            typings: path.resolve(__dirname, 'src/typings'),
            helpers: path.resolve(__dirname, 'src/helpers'),
            util: path.resolve(__dirname, 'src/util'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'public')
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: path.resolve(__dirname, 'public')
                        }
                    },
                    'css-loader',
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/assets', to: 'assets' }
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'public'),
        port: 8888
    }
};
