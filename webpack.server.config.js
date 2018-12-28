const webpack = require("webpack");

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (isProduction) => {
    return {
        devtool: false,
        entry: {
            server: './src/server/server.ts',
        },
        output: {
            path: path.join(__dirname, 'dist/server'),
            publicPath: '/',
            filename: '[name].js'
        },
        target: 'node',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        mode: isProduction ? "production" : "development",
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
        },
        externals: [nodeExternals()], // Need this to avoid error when working with Express,
        plugins: [
            new webpack.DefinePlugin({
                    compile: {
                        isProduction: isProduction
                    }
                }
            )
        ]
    };
};
