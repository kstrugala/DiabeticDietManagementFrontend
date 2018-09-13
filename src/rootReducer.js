import { combineReducers } from 'redux';

import user from './reducers/user'
import patient from './reducers/patients'

export default combineReducers({
    user,
    patient
});