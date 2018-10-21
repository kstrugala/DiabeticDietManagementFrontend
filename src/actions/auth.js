import jwtDecode from 'jwt-decode'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api'

export const userLoggedIn = userData => ({
    type: USER_LOGGED_IN,
    userData
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(jwtData => 
    {
        const decoded = jwtDecode(jwtData.token);
        const userData = {};
        userData.email = decoded.sub;
        userData.role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        userData.TokenExpire = decoded.exp;
        userData.Token = jwtData.token;
        localStorage.tokenJWT = jwtData.token;

        dispatch (userLoggedIn(userData));
    });

export const logout = () => dispatch => {
    localStorage.removeItem("tokenJWT");
    dispatch (userLoggedOut({}));
}

export const changePassword = (payload) => dispatch => // eslint-disable-line
    api.user.changePassword(payload);