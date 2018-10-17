import { GET_DIETARY_COMPLIANCE } from "../types";
import api from "../api";

export const getDietaryCompliance = dietaryCompliance =>({
    type: GET_DIETARY_COMPLIANCE,
    dietaryCompliance
});

export const getDietaryComplianceInfo = () => dispatch =>
    api.dietaryCompliance.get().then(dietaryCompliance => dispatch(getDietaryCompliance(dietaryCompliance)));   

export const getDietaryComplianceInfoByDoctor = (patientId) => dispatch =>
    api.dietaryCompliance.getByDoctor(patientId).then(dietaryCompliance => dispatch(getDietaryCompliance(dietaryCompliance)));   

export const postDietaryCompliance = (payload) => dispatch => //eslint-disable-line
    api.dietaryCompliance.post(payload);   