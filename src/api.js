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
    getEvents: (token) =>
        axios({
            method: 'GET',
            url: API_ROUTES.GET_EVENTS,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }),
}