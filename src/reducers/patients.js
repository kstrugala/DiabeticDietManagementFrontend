import { GET_PATIENTS, USER_LOGGED_OUT } from "../types";

export default function patient(state = {}, action = {}) {
    switch (action.type) {
    case GET_PATIENTS:
        return {...state, patients: action.patients}
    case USER_LOGGED_OUT:
        return {...state, patients: {}}    
    default:
        return state;
    }
}