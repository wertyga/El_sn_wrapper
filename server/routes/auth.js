import validateFields from '../middlewares/validateRequireFields';
import User, { userFields } from '../models/user';

import hash from 'password-hash';

const routes = require('express').Router();

routes.post('/login', validateFields, (req, res) => {
    const { username, password} = req.body;
    // Send to AS token and req.body;

    User.findOne({ $or: [{ username }, { email: username }]})
        .then(user => {
            if(!user) {
                res.status(400).json({ errors: { globalError: 'User is not exist' }});
            } else {
                if(hash.verify(password, user.hashPassword)) {
                    res.json(userFields(user));
                } else {
                    res.status(404).json({ errors: { password: 'Password is incorrect'}});
                }
            };
        })
});

export default routes;