import { GET_DOCTORS, USER_LOGGED_OUT } from "../types";

export default function doctor(state = {}, action = {}) {
    switch (action.type) {
    case GET_DOCTORS:
        return {...state, doctors: action.doctors}
    case USER_LOGGED_OUT:
        return {...state, doctors: {}}    
    default:
        return state;
    }
}