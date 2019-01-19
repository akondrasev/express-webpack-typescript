import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as config from '../../webpack.config.js';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as socketIo from 'socket.io';
import api from "./api/index";
import {Request, Response} from "express-serve-static-core";
import * as session from 'express-session';
import * as bodyParser from "body-parser";

declare let compile: {
    isProduction: boolean
};

let useSecure = true;
let sessionStore = null;//will use in memory by default

if (compile.isProduction) {
    const mongoDbConnect = require('connect-mongodb-session');

    const MongoDBStore = mongoDbConnect(session);

    sessionStore = new MongoDBStore({
        uri: 'mongodb://localhost:27017/app',
        collection: 'sessions'
    });
}

run(useSecure);

function run(useSecure) {
    const expressApp = express();

    expressApp.use(session({
        secret: 'grabAndGo',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(bodyParser.json());
    expressApp.use("/api", api);

    if (!compile.isProduction) {
        const compiler = webpack(config as webpack.Configuration);

        expressApp.use(webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath
        }));

        expressApp.use(webpackHotMiddleware(compiler));

        expressApp.get("*", (req, res, next) => {
            const filename = path.join(compiler.options.output.path, 'index.html');

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

        expressApp.use(express.static(CLIENT_DIR));

        expressApp.get("*", (req, res, next) => {
            res.sendFile(HTML_FILE);
        });
    }

    let server = useSecure ? https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, expressApp) : new http.Server(expressApp);

    const port = useSecure ? 443 : 80;

    server.listen(port, () => {
        console.log(`App listening to ${port}....`);
        console.log('Press Ctrl+C to quit.');
    });

    if (useSecure) {
        const httpApp = express();
        const httpServer = new http.Server(httpApp);

        httpApp.get('*', function (req: Request, res: Response) {
            const url = `https://${req.hostname}${req.url}`;
            console.log("redirect to: ", url);
            res.redirect(url);
        });
        httpServer.listen(80);
    }

    const io = socketIo(server);

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('push', function (data) {
            console.log('push received, emitting a pop', data);
            socket.emit('pop', {hello: 'world'});
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}
