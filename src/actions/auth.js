import jwt_decode from 'jwt-decode'
import { USER_LOGGED_IN } from '../types';
import api from '../api'

export const userLoggedIn = userData => ({
    type: USER_LOGGED_IN,
    userData
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(jwtData => 
    {
        const decoded = jwt_decode(jwtData.token);
        // console.log(decoded);

        const userData = {};
        userData.email = decoded.sub;
        userData.role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        userData.TokenExpire = decoded.exp;
        userData.Token = jwtData.token;
        localStorage.tokenJWT = jwtData.token;

        dispatch (userLoggedIn(userData));
    });
    