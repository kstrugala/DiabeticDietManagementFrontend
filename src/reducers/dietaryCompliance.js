import { GET_DIETARY_COMPLIANCE, USER_LOGGED_OUT } from "../types";

export default function dietaryCompliance(state = {}, action = {}) {
    switch (action.type) {
    case GET_DIETARY_COMPLIANCE:
        return {...state, dietaryCompliance: action.dietaryCompliance}
    case USER_LOGGED_OUT:
        return {...state, dietaryCompliance: {}}    
    default:
        return state;
    }
}