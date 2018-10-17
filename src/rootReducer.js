import { combineReducers } from 'redux';

import user from './reducers/user'
import patient from './reducers/patients'
import receptionist from  './reducers/recepcionists'
import doctor from  './reducers/doctors'
import mealPlan from  './reducers/mealPlan'
import dietaryCompliance from './reducers/dietaryCompliance'

export default combineReducers({
    user,
    patient,
    receptionist,
    doctor,
    mealPlan,
    dietaryCompliance
});