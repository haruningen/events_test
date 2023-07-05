import axios from 'axios'
import {API_ROUTES} from "./utils/constants";

export default {
    signUp: (email, password) =>
        axios({
            method: 'POST',
            url: API_ROUTES.SIGN_UP,
            data: {
                email,
                password,
            }
        }),
    signIn: (email, password) =>
        axios({
            method: 'post',
            url: API_ROUTES.SIGN_IN,
            data: {
                email,
                password
            }
        }),
    verifyEmail: (email_verified_hash) =>
        axios({
            method: 'post',
            url: API_ROUTES.VERIFY_EMAIL,
            data: {
                email_verified_hash,
            }
        }),
    getEvents: (token) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_EVENTS,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
    getEventDetail: (token, id) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_EVENTS + `${id}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
    getUser: (token) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
    attendEvent: (token, id) =>
        axios({
            method: 'POST',
            url: `${API_ROUTES.ATTEND_EVENT}${id}/attend/`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
}