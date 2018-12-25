const webpack = require("webpack");
const devConfig = require("./webpack.dev.config");
const prodConfig = require("./webpack.prod.config");
const serverDevConfig = require("./webpack.server.dev.config");
const serverProdConfig = require("./webpack.server.prod.config");
const rimraf = require('rimraf');

rimraf('/dist', function () {
    console.log('/dist removed');
});

const mode = process.env.mode || "production";

const clientCompiler = webpack(mode === "production" ? prodConfig : devConfig);
const serverCompiler = webpack(mode === "production" ? serverProdConfig : serverDevConfig);

clientCompiler.run();
serverCompiler.run();