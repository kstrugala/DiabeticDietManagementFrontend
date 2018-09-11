import axios from 'axios';

export default {
    user: {
        login: (credentials) => axios.post('api/login', {"Email": credentials.email, "Password": credentials.password}).then(res => res.data)
    }
}