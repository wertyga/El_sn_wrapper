import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

const routes = require('express').Router();

routes.get('/:sys', (req, res) => {
    const fileName = `crypto_signer-${req.params.sys}-x64.zip`;
    const file = path.join(__dirname, '..', 'downloads', fileName);

    res.download(file, fileName)
});


export default routes;

