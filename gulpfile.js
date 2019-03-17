const {series} = require('gulp');
const {parallel} = require('gulp');

const webpack = require('webpack');
const rimraf = require('rimraf');

const serverDevConfig = require("./webpack.server.config");
const clientConfig = require("./webpack.config");

function bundleServer(cb) {
    return new Promise(resolve => webpack(serverDevConfig, (err, stats) => {

        if (err) console.log('Webpack', err);

        console.log(stats.toString({ /* stats options */}))

        resolve();
    }))
}

function bundleClient(cb) {
    return new Promise(resolve => webpack(clientConfig, (err, stats) => {

        if (err) console.log('Webpack', err);

        console.log(stats.toString({ /* stats options */}))

        resolve();
    }))
}

function clean(cb) {
    rimraf('./dist', cb);
}

exports.build = series(clean, bundleServer);
exports.buildProd = series(clean, parallel(bundleServer, bundleClient));
