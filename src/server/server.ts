import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import clientConfig from '../../webpack.config.js';
import http from 'http';
import socketIo from 'socket.io';
import api from "./api/index";

declare let compile:any;

const config = clientConfig(false);

const app = express(),
    CLIENT_DIR = `${__dirname}/../client`,
    HTML_FILE = path.join(CLIENT_DIR, 'index.html');

if (!compile.isProduction) {
    const compiler = webpack(config as webpack.Configuration);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

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
} else {
    app.get('/', (req, res, next) => {
        res.sendFile(HTML_FILE);
    });
}

app.use("/api", api);

const PORT = process.env.PORT || 8080;

const server = new http.Server(app);
const io = socketIo(server);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});
