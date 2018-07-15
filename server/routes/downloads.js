import path from 'path';
import fs from 'fs';

const routes = require('express').Router();

routes.get('/:sys', (req, res) => {
    const { sys } = req.params;
    const filePath = path.join(__dirname, `../../downloads/crypto_signer-${sys}-x64.zip`);

    // res.download(filePath, `crypto_signer-${sys}-x64.zip`, err => {
    //     if(err) {
    //         res.status(500).json({ errors: err.message })
    //     }
    // });

    const rs = fs.createReadStream(filePath);

    rs.on('error', err => {
        res.status(500).json({ errors: err.message });
        rs.close();
    })

    rs.pipe(res)

});


export default routes;

