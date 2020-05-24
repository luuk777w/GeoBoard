const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
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
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),

    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'public'),
        port: 8888
    }
};
