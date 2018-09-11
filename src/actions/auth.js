import jwt_Decode from 'jwt-decode'
import { USER_LOGGED_IN } from '../types';
import api from '../api'

export const userLoggedIn = userData => ({
    type: USER_LOGGED_IN,
    userData
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(jwtData => 
    {
        const decoded = jwt_Decode(jwtData.token);
        //console.log(decoded);

        const userData = {};
        userData.email=decoded.sub;
        userData.role=decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        userData.TokenExpire=decoded.exp;

        dispatch (userLoggedIn(userData));
    });
    