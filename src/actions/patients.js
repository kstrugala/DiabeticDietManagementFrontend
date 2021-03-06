import { GET_PATIENTS, PATIENT_ADDED } from "../types";
import api from "../api";

export const getPatients = patients =>({
    type: GET_PATIENTS,
    patients
});

export const patientCreated = patientAddData =>({
    type: PATIENT_ADDED,
    patientAddData
});

export const getPatientsInfo = query => dispatch =>
    api.patients.get(query).then(patientsData => dispatch(getPatients(patientsData)));

export const addPatient = patient => dispatch =>
    api.patients.post(patient).then(patientAddData => dispatch(patientCreated(patientAddData)));

// eslint-disable-next-line
export const deletePatient = patientGuid => dispatch =>
    api.patients.delete(patientGuid);

// eslint-disable-next-line
export const getPatient = patientGuid => dispatch =>
    api.patients.getPatient(patientGuid);    
 
// eslint-disable-next-line    
export const updatePatient = patient => dispatch =>
    api.patients.put(patient);    