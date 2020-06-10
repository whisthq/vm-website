export const USER_LOGIN = "USER_LOGIN";
export const GOOGLE_LOGIN = "GOOGLE_LOGIN";
export const GOOGLE_REASON = "GOOGLE_REASON";
export const SET_USERNAME = "SET_USERNAME";
export const SET_NEEDSREASON = "SET_NEEDSREASON";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_EMAIL_CORRECT = "FORGOT_PASSWORD_EMAIL_CORRECT";
export const FORGOT_PASSWORD_EMAIL_INCORRECT =
    "FORGOT_PASSWORD_EMAIL_INCORRECT";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const STORE_ACCOUNT_LOCKED = "STORE_ACCOUNT_LOCKED";
export const LOGOUT = "LOGOUT";

export function userLogin(username, password) {
    return {
        type: USER_LOGIN,
        username,
        password,
    };
}

export function googleLogin(code) {
    return {
        type: GOOGLE_LOGIN,
        code,
    };
}

export function googleReason(reason) {
    return {
        type: GOOGLE_REASON,
        reason,
    };
}

export function setUsername(username) {
    return {
        type: SET_USERNAME,
        username,
    };
}

export function setNeedsReason(needs_reason) {
    return {
        type: SET_NEEDSREASON,
        needs_reason,
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    };
}

export function forgotPassword(username) {
    return {
        type: FORGOT_PASSWORD,
        username,
    };
}

export function forgotPasswordEmailIncorrect() {
    return {
        type: FORGOT_PASSWORD_EMAIL_INCORRECT,
    };
}

export function forgotPasswordEmailCorrect(username) {
    return {
        type: FORGOT_PASSWORD_EMAIL_CORRECT,
        username,
    };
}

export function resetPassword(username, password) {
    return {
        type: RESET_PASSWORD,
        username,
        password,
    };
}

export function storeAccountLocked(locked) {
    return {
        type: STORE_ACCOUNT_LOCKED,
        locked,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
