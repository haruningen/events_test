const API_URL = 'http://127.0.0.1:8080'
export const FRONTEND_URL = 'http://localhost:3000'
export const API_ROUTES = {
    SIGN_UP: `${API_URL}/api/auth/signup`,
    SIGN_IN: `${API_URL}/api/auth/login`,
    SIGN_IN_OTP: `${API_URL}/api/auth/login`,
    ENABLE_OTP: `${API_URL}/api/users/otp/enable`,
    DISABLE_OTP: `${API_URL}/api/users/otp/disable`,
    REQUEST_RESET_PASSWORD: `${API_URL}/api/auth/reset_password`,
    LOGOUT: `${API_URL}/api/auth/logout/`,
    RESET_PASSWORD: `${API_URL}/api/auth/reset_password_confirm`,
    VERIFY_EMAIL: `${API_URL}/api/users/validate-email-token`,
    LOAD_AVATAR: `${API_URL}/api/users/me/avatar`,
    GET_USER: `${API_URL}/api/users/me`,
    GET_USER_EVENTS: `${API_URL}/api/events/my`,
    GET_EVENTS: `${API_URL}/api/events`,
    ATTEND_EVENT: `${API_URL}/api/events`,
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