import { GET_PLAN } from "../types";

import api from "../api";

export const getPlan = (plan) => ({
    type: GET_PLAN,
    plan
})

export const getMealPlan = patientId => dispatch =>
    api.plan.get(patientId).then(plan=>dispatch(getPlan(plan)));