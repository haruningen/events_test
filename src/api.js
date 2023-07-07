import axios from 'axios'
import {API_ROUTES} from "./utils/constants";

export default {
    signUp: (email, password, confirm_password) =>
        axios({
            method: 'POST',
            url: API_ROUTES.SIGN_UP,
            data: {
                email,
                password,
                confirm_password,
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
    requestResetPassword: (email) =>
        axios({
            method: 'post',
            url: API_ROUTES.REQUEST_RESET_PASSWORD,
            data: {email}
        }),
    confirmResetPassword: (password_reset_hash, new_password, re_new_password) =>
        axios({
            method: 'post',
            url: API_ROUTES.RESET_PASSWORD,
            data: {
                password_reset_hash,
                new_password,
                re_new_password
            }
        }),
    verifyEmail: (email_verified_hash) =>
        axios({
            method: 'post',
            url: API_ROUTES.VERIFY_EMAIL,
            data: {email_verified_hash}
        }),
    loadAvatar: (token, formData) =>
        axios({
            method: 'put',
            url: API_ROUTES.LOAD_AVATAR,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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
    getUserEvents: (token) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_USER_EVENTS,
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