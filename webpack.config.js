const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputDir = `dist/client`;

module.exports = (isProduction) => {
    console.log("isProduction: ", isProduction);

    const mainEntries = ['./src/client/index'];

    if (!isProduction) {
        mainEntries.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    }

    const plugins = [
        new webpack.DefinePlugin({
                compile: {
                    isProduction: isProduction
                }
            }
        ),
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
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.tsx?$/,
                    use: ['ts-loader', 'angularjs-template-loader'],
                    exclude: /node_modules/
                },
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
                {
                    test: /\.scss$/,
                    use: isProduction ? [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] : ["style-loader", "css-loader", "sass-loader"]
                }
            ]
        },
        plugins: plugins,
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        }
    };

    if (isProduction) {
        config.optimization = {
            minimizer: [
                new TerserPlugin({
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        };
    }

    return config;
};
