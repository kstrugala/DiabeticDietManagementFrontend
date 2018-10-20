import axios from 'axios';
import { GET_DIETARY_COMPLIANCE } from "../types";
import api from "../api";

export const getDietaryCompliance = dietaryCompliance =>({
    type: GET_DIETARY_COMPLIANCE,
    dietaryCompliance
});

export const getDietaryComplianceInfo = (query) => dispatch =>
{
    axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;
    api.dietaryCompliance.get(query).then(dietaryCompliance => dispatch(getDietaryCompliance(dietaryCompliance)));   
}

export const getDietaryComplianceInfoByDoctor = (patientId, query) => dispatch =>
{
    axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;
    api.dietaryCompliance.getByDoctor(patientId, query).then(dietaryCompliance => dispatch(getDietaryCompliance(dietaryCompliance)));   
}
export const postDietaryCompliance = (payload) => dispatch => //eslint-disable-line
    api.dietaryCompliance.post(payload);   