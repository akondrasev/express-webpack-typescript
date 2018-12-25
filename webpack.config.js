const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputDir = `dist/client`;

module.exports = (isProduction) => {
    console.log("isProduction: ", isProduction);

    const mainEntries = [];

    if (!isProduction) {
        mainEntries.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    }

    mainEntries.push('./src/client/index.js');

    const plugins = [
        new HtmlWebPackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html"
        })
    ];

    if (isProduction) {
        plugins.push(new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }));
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    const rules = [
        {
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader",
                    options: {minimize: isProduction}
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: isProduction ? ["url-loader"] : ['file-loader']
        },
        {
            test: /\.css$/,
            use: isProduction ? [MiniCssExtractPlugin.loader, 'css-loader'] : ['style-loader', 'css-loader']
        },
    ];

    const config = {
        entry: {
            main: mainEntries
        },
        output: {
            path: path.join(__dirname, outputDir),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: isProduction ? 'production' : 'development',
        target: 'web',
        devtool: isProduction ? false : '#source-map',
        module: {
            rules: rules
        },
        plugins: plugins
    };

    if (isProduction) {
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        };
    }

    return config;
};