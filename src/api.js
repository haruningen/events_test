import axios from 'axios'
import {API_ROUTES} from "./utils/constants";

export default {
    signUp: (email, password, password_confirm) =>
        axios({
            method: 'POST',
            url: API_ROUTES.SIGN_UP,
            data: {
                email,
                password,
                password_confirm,
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
    tfaLogin: (email, otp_code) =>
        axios({
            method: 'post',
            url: API_ROUTES.SIGN_IN_OTP,
            data: {
                email,
                otp_code
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
    logout: (token, refresh) =>
        axios({
            method: 'post',
            url: API_ROUTES.LOGOUT,
            data: {refresh},
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
    loadAvatar: (token, formData) =>
        axios({
            method: 'post',
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
    getEventDetailAuth: (token, id) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_EVENTS + `${id}/`,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
    getEventDetail: (id) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_EVENTS + `${id}/`,
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