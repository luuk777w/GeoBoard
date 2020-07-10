const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path');

module.exports = (env) => {

    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
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
                        "postcss-loader",
                        'sass-loader'
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
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        devServer: {
            historyApiFallback: true,
            contentBase: path.resolve(__dirname, 'public'),
            port: 8888,
            stats: "errors-warnings",
        }
    };
}
