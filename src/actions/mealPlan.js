import { GET_PLAN, GET_PLAN_FOR_EDITION } from "../types";

import api from "../api";

export const getPlan = (plan) => ({
    type: GET_PLAN,
    plan
})

export const getPlanForEdition = (plan) => ({
    type: GET_PLAN_FOR_EDITION,
    plan
})


export const getMealPlan = patientId => dispatch =>
    api.plan.get(patientId).then(plan=>dispatch(getPlan(plan)));
    
export const getMealPlanForEdition = patientId => dispatch =>
    api.plan.getForEdition(patientId).then(plan=>dispatch(getPlanForEdition(plan)));