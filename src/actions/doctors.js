import { GET_DOCTORS, DOCTOR_ADDED } from "../types";
import api from "../api";

export const getDoctors = doctors =>({
    type: GET_DOCTORS,
    doctors
});

export const doctorCreated = doctorAddData =>({
    type: DOCTOR_ADDED,
    doctorAddData
});

export const getDoctorsInfo = query => dispatch =>
    api.doctors.get(query).then(doctorsData => dispatch(getDoctors(doctorsData)));

export const addDoctor = doctor => dispatch =>
    api.doctors.post(doctor).then(doctorAddData => dispatch(doctorCreated(doctorAddData)));


// eslint-disable-next-line
export const getReceptionist = doctorGuid => dispatch =>
    api.doctors.getDoctor(doctorGuid);    
 
// eslint-disable-next-line    
export const updateDoctor = doctor => dispatch =>
    api.doctors.put(doctor);    