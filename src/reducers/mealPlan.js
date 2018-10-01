import { GET_PLAN, USER_LOGGED_OUT } from "../types";

export default function mealPlan(state = {}, action = {}) {
    switch (action.type) {
    case GET_PLAN:
        return {...state, mealPlan: action.plan}
    case USER_LOGGED_OUT:
        return {...state, mealPlan: {}}    
    default:
        return state;
    }
}