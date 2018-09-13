import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";

export default function user(state = {}, action = {}) {
    switch (action.type) {
    case USER_LOGGED_IN:
        return {...state, userData: action.userData};
    case USER_LOGGED_OUT:
        return {...state, userData : {}};    
    default:
        return state;
    }
}
