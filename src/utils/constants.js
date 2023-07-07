const API_URL = 'http://127.0.0.1:8000'
export const FRONTEND_URL = 'http://localhost:3000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/auth/registration/`,
    SIGN_IN: `${API_URL}/api/auth/login/`,
    REQUEST_RESET_PASSWORD: `${API_URL}/api/auth/reset_password/`,
    RESET_PASSWORD: `${API_URL}/api/auth/reset_password_confirm/`,
    VERIFY_EMAIL: `${API_URL}/api/users/validate-email-token/`,
    LOAD_AVATAR: `${API_URL}/api/users/load-avatar/`,
    GET_USER: `${API_URL}/api/users/me/`,
    GET_USER_EVENTS: `${API_URL}/api/events/my/`,
    GET_EVENTS: `${API_URL}/api/events/`,
    ATTEND_EVENT: `${API_URL}/api/events/`,
}

export const APP_ROUTES = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    HOME: '/home',
    VERIFY_EMAIL: '/email-verify/:token',
    DETAIL: '/event/:id',
    PROFILE: '/profile',
    REQUEST_RESET_PASSWORD: '/request_reset_password',
    RESET_PASSWORD: '/reset-password/:token',
}