import { combineReducers } from 'redux';

import globalErrors  from './globalErrors';
import payment  from './payment';

export default combineReducers({
    globalErrors,
    payment
});