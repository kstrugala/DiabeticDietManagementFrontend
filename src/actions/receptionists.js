import { GET_RECEPTIONISTS, RECEPTIONIST_ADDED } from "../types";
import api from "../api";

export const getReceptionists = receptionists =>({
    type: GET_RECEPTIONISTS,
    receptionists
});

export const receptionistCreated = receptionistAddData =>({
    type: RECEPTIONIST_ADDED,
    receptionistAddData
});

export const getReceptionistsInfo = query => dispatch =>
    api.receptionists.get(query).then(patientsData => dispatch(getReceptionists(patientsData)));

export const addReceptionist = receptionist => dispatch =>
    api.receptionists.post(receptionist).then(receptionistAddData => dispatch(receptionistCreated(receptionistAddData)));


// eslint-disable-next-line
export const getReceptionist = receptionistGuid => dispatch =>
    api.receptionists.getPatient(receptionistGuid);    
 
// eslint-disable-next-line    
export const updateReceptionist = receptionist => dispatch =>
    api.receptionists.put(receptionist);    