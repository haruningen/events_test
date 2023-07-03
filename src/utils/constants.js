const API_URL = 'http://127.0.0.1:8000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/auth/registration/`,
    SIGN_IN: `${API_URL}/api/auth/login/`,
    GET_USER: `${API_URL}/api/users/me/`,
    GET_EVENTS: `${API_URL}/api/events/`,
}

export const APP_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    HOME: '/home',
}