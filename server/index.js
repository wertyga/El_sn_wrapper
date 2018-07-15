import express from 'express';
import bodyParser from 'body-parser';

import path from 'path';
import cluster from 'cluster';
import http from 'http';

import config from './common/config';
import './common/mongoose';
const log = require('./common/log')(module);

// SSR
import renderHTML from './common/functions/renderHtml';
import App from '../client/components/App/App';
import NotFoundPage from '../client/components/404/404';

// ****************** Import routes *************
import fetch from './routes/fetch';
import donate from './routes/donate';
import downloads from './routes/downloads';
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
    if(!test) server.listen(config.PORT, () => console.log(`Server run on ${config.PORT} port`));
};

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
app.use(express.static(path.join(__dirname, '..', 'static')));
app.use(express.static(path.join(__dirname, '..')));

//******************************** Routes ***************************

app.use('/fetch', fetch);
app.use('/donate', donate);
app.use('/downloads', downloads);

// Error handler with next()
app.use((err, req, res, next) => {
    if(err.donateError) {
        return res.send(renderHTML(req, <App />, { globalErrors: err.donateError }));
    } else if(err) {
        return res.send(renderHTML(req, <NotFoundPage />));
    } else {
        return next();
    }
});


app.get('/*', (req, res) => {
    res.send(renderHTML(req, <App />));
});

//******************************** Uncaught Exception ***************************

process.on('uncaughtException', function (err) {
    log.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    log.error(err.stack);
    process.exit(1);
});