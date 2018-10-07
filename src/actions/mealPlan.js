import { GET_PLAN, GET_PLAN_FOR_EDITION, ADD_TO_MEAL_PLAN, REMOVE_FROM_MEAL_PLAN, CHANGE_MEAL_PLAN_NAME } from "../types";

import api from "../api";

export const getPlan = (plan) => ({
    type: GET_PLAN,
    plan
})

export const getPlanForEdition = (plan) => ({
    type: GET_PLAN_FOR_EDITION,
    plan
})

export const changeMealPlanName = (name) => ({
    type: CHANGE_MEAL_PLAN_NAME,
    name
})

export const addToMealPlan = (day, meal, product, quantity) => ({
    type: ADD_TO_MEAL_PLAN,
    meal,
    day,
    product,
    quantity
})

export const removeFromMealPlan = (day, meal, productId, quantity) => ({
    type: REMOVE_FROM_MEAL_PLAN,
    day,
    meal,
    productId,
    quantity
})
export const getMealPlan = patientId => dispatch =>
    api.plan.get(patientId).then(plan=>dispatch(getPlan(plan)));
    
export const getMealPlanForEdition = patientId => dispatch =>
    api.plan.getForEdition(patientId).then(plan=>dispatch(getPlanForEdition(plan)));

