import { GET_RECEPTIONISTS, USER_LOGGED_OUT } from "../types";

export default function receptionist(state = {}, action = {}) {
    switch (action.type) {
    case GET_RECEPTIONISTS:
        return {...state, receptionists: action.receptionists}
    case USER_LOGGED_OUT:
        return {...state, receptionists: {}}    
    default:
        return state;
    }
}