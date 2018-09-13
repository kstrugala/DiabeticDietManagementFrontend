import { GET_PATIENTS } from "../types";
import api from "../api";

export const getPatients = patients =>({
    type: GET_PATIENTS,
    patients
});

export const getPatientsInfo = query => dispatch =>
{
    api.patients.get(query).then(patientsData => dispatch(getPatients(patientsData)));
} 