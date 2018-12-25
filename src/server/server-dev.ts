import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import clientConfig from '../../webpack.config.js';

import api from "./api/index";

const config = clientConfig(false);

const app = express(),
    CLIENT_DIR = `${__dirname}/../client`,
    HTML_FILE = path.join(CLIENT_DIR, 'index.html'),
    compiler = webpack(config as webpack.Configuration);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use("/api", api);

app.get('/', (req, res, next) => {
    // @ts-ignore
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
            return next(err);
        }

        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    })
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});