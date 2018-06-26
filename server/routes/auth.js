import validateFields from '../middlewares/validateRequireFields';
import User, { userFields } from '../models/user';

import hash from 'password-hash';

const routes = require('express').Router();

routes.post('/login', validateFields, (req, res) => {
    const { username, password} = req.body;
    // Send to AS token and req.body;
    // And get from it user data
    User.findOne({ $or: [{ username }, { email: username }]})
        .then(user => {
            if(!user) {
                res.status(400).json({ errors: { username: 'User is not exist' }});
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