import { GET_PLAN, GET_PLAN_FOR_EDITION, USER_LOGGED_OUT } from "../types";

export default function mealPlan(state = {}, action = {}) {
    switch (action.type) {
    case GET_PLAN:
        return {...state, mealPlan: action.plan}
    case GET_PLAN_FOR_EDITION:
        return {...state, mealPlan: action.plan}
    case USER_LOGGED_OUT:
        return {...state, mealPlan: {}}    
    default:
        return state;
    }
}