import { combineReducers } from 'redux';

import user from './reducers/user'
import patient from './reducers/patients'
import receptionist from  './reducers/recepcionists'


export default combineReducers({
    user,
    patient,
    receptionist
});