import axios from 'axios';

axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;

export default {
    user: {
        login: (credentials) => axios.post('api/login', {"Email": credentials.email, "Password": credentials.password}).then(res => res.data)
    },
    patients: {
        get: (query) => axios.get('api/patients', {
            params:{
                first:query.firstName,
                lastName:query.lastName,
                pageSize: query.pageSize,
                page: query.page
            }}).then(res => res.data),
        getPatient: (patientGuid) => axios.get(`api/patients/${patientGuid}`).then(res=>res.data),
        post: (patient) => axios.post('api/patients', {firstname:patient.firstname, lastname:patient.lastname, username:patient.username, email:patient.email, password:patient.password}).then(res=>res.data),
        put: (patient) => axios.put(`api/patients/${patient.id}`, {firstname:patient.firstname, lastname:patient.lastname, email:patient.email}).then(res=>res.data),
        delete: (patientGuid) => axios.delete(`api/patients/${patientGuid}`).then(res=>res.data)
    },
    receptionists: {
        get: (query) => axios.get('api/receptionists', {
            params:{
                first:query.firstName,
                lastName:query.lastName,
                pageSize: query.pageSize,
                page: query.page
            }}).then(res => res.data),
        getReceptionist: (receptionistGuid) => axios.get(`api/receptionists/${receptionistGuid}`).then(res=>res.data),
        post: (receptionist) => axios.post('api/receptionists', {firstname:receptionist.firstname, lastname:receptionist.lastname, username:receptionist.username, email:receptionist.email, password:receptionist.password}).then(res=>res.data),
        put: (receptionist) => axios.put(`api/receptionists/${receptionist.id}`, {firstname:receptionist.firstname, lastname:receptionist.lastname, email:receptionist.email}).then(res=>res.data),
    },
    doctors: {
        get: (query) => axios.get('api/doctors', {
            params:{
                first:query.firstName,
                lastName:query.lastName,
                pageSize: query.pageSize,
                page: query.page
            }}).then(res => res.data),
        getDoctor: (doctorGuid) => axios.get(`api/doctors/${doctorGuid}`).then(res=>res.data),
        post: (doctor) => axios.post('api/doctors', {firstname:doctor.firstname, lastname:doctor.lastname, username:doctor.username, email:doctor.email, password:doctor.password}).then(res=>res.data),
        put: (doctor) => axios.put(`api/doctors/${doctor.id}`, {firstname:doctor.firstname, lastname:doctor.lastname, email:doctor.email}).then(res=>res.data),
    }
}