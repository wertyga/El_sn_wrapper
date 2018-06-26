import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import cluster from 'cluster';
import http from 'http';

import config from './common/config';
import './common/mongoose';
const log = require('./common/log')(module);

// ****************** Import routes *************
import auth from './routes/auth';
import fetch from './routes/fetch';
import externals from './routes/externalCredentials';
//***********************************************
const dev = process.env.NODE_ENV === 'development';
const test = process.env.NODE_ENV === 'test';
const prod = process.env.NODE_ENV === 'production';


export const app = express();
export const server = http.createServer(app);

if(prod && cluster.isMaster) {

    let cpuCount = require('os').cpus().length;

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.schedulingPolicy = cluster.SCHED_NONE;
        cluster.fork();
    }

    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

} else {
    //******************************** Run server ***************************

    if(!test) server.listen(config.PORT, () => console.log(`Server run on ${config.PORT} port`));

    // *******************************************************************
};


//****************** Webpack ********************
if (dev) {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.dev.config');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackMiddleware = require('webpack-dev-middleware');

    const compiler = webpack(webpackConfig);

    app.use(webpackMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler));
}

//**********************************************

if(prod) {

    //************************* GARBAGE magic ***********************************

    // Для работы с garbage collector запустите проект с параметрами:
    // node --nouse-idle-notification --expose-gc app.js
    let gcInterval;

    function init() {
        gcInterval = setInterval(function () {
            gcDo();
        }, 60000);
    };

    function gcDo() {
        global.gc();
        clearInterval(gcInterval);
        init();
    };

    init();

    //************************************************************
}

    app.use(bodyParser.json());
    if(!dev) app.use(express.static(path.join(__dirname, '..', 'client', 'static')));
    app.use(express.static(path.join(__dirname, config.uploads.directory)));

    //******************************** Routes ***************************
    app.use('/auth', auth);
    app.use('/fetch', fetch);
    app.use('/externals', externals);

    app.get('/*', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Crypto signer</title>
            </head>
            <body>
            
                <div id="app"></div>
            
                <script src="/bundle.js"></script>
            </body>
            </html>
        `);
    });

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
    log.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    log.error(err.stack);
    process.exit(1);
});






