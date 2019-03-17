import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as config from '../../webpack.config.js';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import api from "./api/index";
import {Request, Response} from "express-serve-static-core";

declare let compile: any;

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

    app.use(express.static(CLIENT_DIR));
}

app.use("/api", api);

const PORT = process.env.PORT || 8080;

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
    console.log(`App listening to ${PORT}....`);
    console.log('Press Ctrl+C to quit.');
});
