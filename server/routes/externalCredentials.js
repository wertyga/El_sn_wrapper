// const fs = require('fs');

const route = require('express').Router();

route.get('/token/:token', (req, res) => {
    // externalToken = req.params.token;
    console.log(req.params.token)
    process.env.EXTERNALS = req.params.token;
    res.end();
});

module.exports = route;

//const fileName = 'external_credential.js';
// const filePath = __dirname + `/../${fileName}`;
// function createFile(token) {
//     const code = `const codeObj = { code: '${token}', created_at: '${new Date()}' }; module.exports = codeObj;`;
//     fs.writeFile(filePath, code, (err, result) => {
//         if(err) console.error(`Error in write file: ${err}`);
//     });
// };

