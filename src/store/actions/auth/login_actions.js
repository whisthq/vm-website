export const USER_LOGIN                      = "USER_LOGIN";
export const LOGIN_SUCCESS                   = "LOGIN_SUCCESS";
export const LOGIN_FAILURE                   = "LOGIN_FAILURE";
export const FORGOT_PASSWORD                 = "FORGOT_PASSWORD";
export const FORGOT_PASSWORD_EMAIL_CORRECT   = "FORGOT_PASSWORD_EMAIL_CORRECT";
export const FORGOT_PASSWORD_EMAIL_INCORRECT = "FORGOT_PASSWORD_EMAIL_INCORRECT";
export const RESET_PASSWORD                  = "RESET_PASSWORD";


export function userLogin(username, password) {
    return {
        type: USER_LOGIN,
        username,
        password
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