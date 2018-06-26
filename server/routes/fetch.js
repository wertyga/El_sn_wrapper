import validateFields from '../middlewares/validateRequireFields';

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

export default routes;