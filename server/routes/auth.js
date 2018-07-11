import config from '../common/config';
import axios from 'axios';
import validateFields from '../middlewares/validateRequireFields';

const log = require('../common/log')(module);

const routes = require('express').Router();


routes.post('/login', validateFields, (req, res) => {
    const { username, password } = req.body;
    const externalToken = process.env.EXTERNALS;

    axios.post(`${config.appHost}/externals/get-user`, { username, password, externalToken })
        .then(user => {
            res.json(user.data)
        })
        .catch(err => {
            res.status(err.response ? err.response.status : 400).json(err.response ? err.response.data : err.message);
        })
    // Send to AS token and req.body;
    // And get from it user data

});

export default routes;