const webpack = require("webpack");
const clientConfig = require("./webpack.config");
const serverDevConfig = require("./webpack.server.config");
const rimraf = require('rimraf');

const isProduction = process.env.mode ? process.env.mode.trim() === "production" : false;

const clientConfigResult = clientConfig(isProduction);

const clientCompiler = webpack(clientConfigResult);
const serverCompiler = webpack(serverDevConfig(isProduction));

rimraf('./dist', function () {
    console.log('/dist removed');

    if (isProduction) {
        clientCompiler.run();
    }

    serverCompiler.run();
});