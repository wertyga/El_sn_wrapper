import axios from 'axios';

export const request = data => dispatch => {
    return axios.post('/fetch/request', data)
};