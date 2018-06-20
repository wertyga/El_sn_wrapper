import { SET_USER } from "../actions/constants";

const initialState = {};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case(SET_USER):
            return action.user;

        default:
            return state;
    };
};