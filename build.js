const webpack = require("webpack");
const clientConfig = require("./webpack.config");
const serverDevConfig = require("./webpack.server.config");
const rimraf = require('rimraf');

const isProduction = process.env.mode ? process.env.mode.trim() === "production" : false;

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverDevConfig);

rimraf('./dist', function () {
    console.log('/dist removed');

    if (isProduction) {
        clientCompiler.run((err, stats) => {
            console.log(stats.compilation.errors);
        });
    }

    serverCompiler.run((err, stats) => {
        console.log(stats.compilation.errors);
    });
});
