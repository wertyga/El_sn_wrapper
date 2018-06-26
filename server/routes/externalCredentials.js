const fs = require('fs');

const route = require('express').Router();
const fileName = 'external_credential.js';
const filePath = __dirname + `/../${fileName}`;

route.get('/token/:token', (req, res) => {
    createFile(req.params.token);
});

module.exports = route;

function createFile(token) {
    const code = `const codeObj = { code: '${token}', created_at: '${new Date()}' }; module.exports = codeObj;`;
    fs.writeFile(filePath, code, (err, result) => {
        if(err) console.error(`Error in write file: ${err}`);
    });
};

