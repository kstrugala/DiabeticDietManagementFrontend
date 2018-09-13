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
            }}).then(res => res.data)
    }
}