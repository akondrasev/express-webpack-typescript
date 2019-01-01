import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as clientConfig from '../../webpack.config.js';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as socketIo from 'socket.io';
import * as cookieParser from 'cookie-parser';
import api from "./api/index";
import {Request, Response} from "express-serve-static-core";

declare let compile: any;

const config = clientConfig(false);

const app = express();

const clientAppRoute = "*";

app.use(cookieParser());

app.use("/api", api);

if (!compile.isProduction) {
    const compiler = webpack(config as webpack.Configuration);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    app.get(clientAppRoute, (req, res, next) => {
        const filename = path.join(compiler.options.output.path,'index.html');

        // @ts-ignore
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                console.log("error reading file", filename);
                res.end(`error reading file from ${filename}`);
                return;
            }

            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });

    });
} else {
    const CLIENT_DIR = `${__dirname}/../client`,
        HTML_FILE = path.join(CLIENT_DIR, 'index.html');

    app.use(express.static(CLIENT_DIR));

    app.get(clientAppRoute, (req, res, next) => {
        res.sendFile(HTML_FILE);
    });
}

const PORT = process.env.PORT || 80;

const httpApp = express();
const httpServer = new http.Server(httpApp);

httpApp.get('*', function (req: Request, res: Response) {
    const url = `https://${req.hostname}${req.url}`;
    console.log("redirect to: ", url);
    res.redirect(url);
});

const httpsServer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app);

httpServer.listen(PORT);

httpsServer.listen(443, () => {
    console.log(`App listening to ${443}....`);
    console.log('Press Ctrl+C to quit.');
});

const io = socketIo(httpsServer);

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
