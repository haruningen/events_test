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
}