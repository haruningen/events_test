import {API_ROUTES} from '../utils/constants';
import axios from 'axios';

export function storeTokensInLocalStorage(token, refresh) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

export function getRefreshTokenFromLocalStorage() {
    return localStorage.getItem('refresh');
}

export function removeTokensFromLocalStorage() {
    return localStorage.removeItem('token');
    return localStorage.removeItem('refresh');
}

export async function getAuthenticatedUser() {
    const defaultReturnObject = {authenticated: false, user: null};
    try {
        const token = getTokenFromLocalStorage();
        if (!token) {
            return defaultReturnObject;
        }
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const {authenticated = false} = response.data;
        return authenticated ? response.data : false;
    } catch (err) {
        console.log('getAuthenticatedUser, Something Went Wrong', err);
        return defaultReturnObject;
    }
}