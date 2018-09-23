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
    }
}