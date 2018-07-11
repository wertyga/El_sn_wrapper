import axios from 'axios';

import validateFields from '../middlewares/validateRequireFields';
import config from '../common/config';

import Request from '../models/request';

const routes = require('express').Router();

routes.post('/request', validateFields, (req, res) => {
    const { email, message } = req.body;

    return new Request({ email, message }).save()
        .then(request => {
            res.json('request was received');
        })
        .catch(err => res.status(400).json({ errors: err.message }));
});
routes.post('/unsubscribe', (req, res) => {
    const { userID, emailToken } = req.body;

    axios.post(config.appHost + `/email/unsubscribing/${userID}/${emailToken}`)
        .then(() => res.json('success'))
        .catch(err => res.status(err.response.status).json({ errors: err.response ? err.response.data.errors : err.message  }))
});

export default routes;