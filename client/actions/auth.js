import axios from 'axios';

import { SET_USER } from './constants';

export const login = data => dispatch => {
    return axios.post('/auth/login', data)
        .then(res => {
            dispatch(setUser(res.data));
            return res.data;
        })
};
const setUser = user => ({
    type: SET_USER,
    user
});