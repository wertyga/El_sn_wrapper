const fs = require('fs');

const route = require('express').Router();
const fileName = 'external_credential.js';
const filePath = __dirname + `/../${fileName}`;

route.get('/token/:code', (req, res) => {
    createFile(req.params.code);
});

module.exports = route;

function createFile(code) {
    code = `const codeObj = { code: '${code}', created_at: '${new Date()}' }; module.exports = codeObj;`
    fs.stat(filePath, (err, stat) => {
        if(err && err.code === 'ENOENT') {
            fs.writeFile(filePath, code, (err, result) => {
                if(err) console.error(`Error in write file: ${err}`);
            });
        } else {
            fs.unlink(filePath, (err) => {
                if(err) {
                    console.error(`Error in unlink file: ${err}`);
                } else {
                    fs.writeFile(filePath, code, (err, result) => {
                        if(err) console.error(`Error in write file: ${err}`);

                    });
                }
            });
        };
    });
};

